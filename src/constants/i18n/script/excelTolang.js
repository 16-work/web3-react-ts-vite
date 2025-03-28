//导入
import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import * as OpenCC from "opencc-js";

const commonFilePath = path.resolve("./", "src/constants/i18n/config.ts");
const commonFileContent = fs.readFileSync(commonFilePath, "utf8");
const converter = OpenCC.ConverterFactory(
  OpenCC.Locale.from.cn,
  OpenCC.Locale.to.tw.concat([
    ["查看", "檢視"],
    ["过滤", "篩選"],
    ["服务器", "伺服器"],
    ["文件", "檔案"],
    ["拖动", "拖放"],
    ["余额", "餘額"],
    ["检索", "搜尋"],
    ["倒计时", "倒數"],
    ["分布", "分佈"],
    ["字符", "字元"],
  ])
);
// 读取需要生成的语言列表
const match = commonFileContent.match(/supportLanguages\s*=\s*({[\s\S]*?});/);
const languageOptions = new Function(`return ${match[1]}`)();
const languageType = Object.keys(languageOptions);

const excelFileName = "i18n.xlsx";
const currentDirPath = "/src/constants/i18n/script"; // 当前目录路径
const __dirname = path.resolve(`${process.cwd()}${currentDirPath}`);
let workbook = xlsx.readFile(path.join(__dirname, excelFileName));

let sheets = {};
let sheetNames = workbook.SheetNames;
sheetNames.map((v, i) => {
  let encode = v.split("-")[0];
  let sheet = workbook.Sheets[sheetNames[i]];
  let range = xlsx.utils.decode_range(sheet["!ref"]);
  let arr = [];
  // //循环获取单元格值
  for (let R = range.s.r; R <= range.e.r; ++R) {
    let row_value = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_address = {
        c: C,
        r: R,
      }; //获取单元格地址
      let cell = xlsx.utils.encode_cell(cell_address); //根据单元格地址获取单元格
      if (cell != "A1" && cell != "B1" && cell != "C1") {
        //获取单元格值
        if (sheet[cell]) {
          // 如果出现乱码可以使用iconv-lite进行转码
          // row_value += iconv.decode(sheet1[cell].v, 'gbk') + ", ";
          //    if(sheet1[cell].v != 'encode')
          row_value.push(sheet[cell].v);
        } else {
          //     row_value += ", ";
        }
      }
    }
    if (row_value.length) {
      arr.push(row_value);
    }
  }
  sheets[encode] = arr;
});

/** 开始生成 */
// 取表格中的语言列
const theadLangs = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { header: 1 })[0];
theadLangs.shift();

// 将excel转化为对象
const lang = {};
theadLangs.map((langName, langIndex) => {
  const tables = {};
  Object.keys(sheets).map((sheetName) => {
    const o = {};
    sheets[sheetName].map((row) => {
      o[row[0]] = row[langIndex + 1];
    });
    tables[sheetName] = o;
  });
  lang[langName] = tables;
});

// 生成繁中表
if (languageType.find((item) => item === "zh-TW")) {
  const table = {};
  Object.keys(lang["zh-CN"]).map((sheetName) => {
    const sheet = {};
    Object.keys(lang["zh-CN"][sheetName]).map((key) => {
      sheet[key] = converter(lang["zh-CN"][sheetName][key]);
    });

    table[sheetName] = sheet;
  });
  lang["zh-TW"] = table;
}

// 只导出需要的语言
const filteredLang = Object.keys(lang).reduce((acc, key) => {
  if (languageType.includes(key)) {
    acc[key] = lang[key];
  }
  return acc;
}, {});

// 生成其它语言文件
Object.keys(filteredLang).map((key) => {
  fs.writeFile(path.resolve(__dirname, `../language/${key}.ts`), "export default" + JSON.stringify(lang[key]), (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`----------新增${key}.ts成功-------------`);
  });
});

// 删除不需要的语言文件
const languageDirPath = path.resolve(__dirname, "../language");
const filesInLanguageDir = fs.readdirSync(languageDirPath);
filesInLanguageDir.forEach((file) => {
  const filePath = path.join(languageDirPath, file);

  // 获取文件名（不包含扩展名）
  const fileNameWithoutExt = path.parse(file).name;

  // 如果文件名不在 key 中，则删除文件
  if (!Object.keys(filteredLang).includes(fileNameWithoutExt)) {
    fs.unlinkSync(filePath);
    console.log(`删除文件: ${file}`);
  }
});
