import * as OpenCC from "opencc-js";

export const converter = OpenCC.ConverterFactory(
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