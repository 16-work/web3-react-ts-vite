import fs from 'fs';
import path from 'path';

/* 选项 */
const defaultThemeFilePath = 'src/constants/common.ts'; // 默认主题变量所在文件路径
const themeDirPath = 'src/assets/theme'; // 各主题scss所在目录路径
const colorFilePath = 'config/tailwindcss/color.ts'// 生成的color.ts文件位置



// 读取 SCSS 文件路径
const commonFilePath = path.resolve('./', defaultThemeFilePath);
const commonFileContent = fs.readFileSync(commonFilePath, 'utf8');
const defaultThemeMatch = /export\s+const\s+DEFAULT_THEME\s*=\s*'([^']+)'/;
const defaultThemeMatchResult = commonFileContent.match(defaultThemeMatch);
if (!defaultThemeMatchResult) {
  console.error('Could not find DEFAULT_THEME in common.ts');
  process.exit(1); // 退出程序
}
const DEFAULT_THEME = defaultThemeMatchResult[1];
const scssFilePath = path.resolve('./', `${themeDirPath}/${DEFAULT_THEME}.scss`);
const tsFilePath = path.resolve('./', colorFilePath);

// 读取 SCSS 文件内容
fs.readFile(scssFilePath, 'utf8', (err, data) => {
  /** 生成color.ts */
  if (err) {
    console.error('Error reading SCSS file:', err);
    return;
  }

  const colorRegex = /--([a-zA-Z0-9\-]+):\s*([a-zA-Z0-9,\s\-\(\)]+)\s*;/g;

  let match;
  const colors = {
    primary: {},
    second: {}, // second 和 gray 放在一起
    feature: {},
    text: {},
    base: {
      black: '#000',
      white: '#fff',
      transparent: 'transparent',
    },
  };

  // 解析 SCSS 中的颜色变量并按类目分类
  while ((match = colorRegex.exec(data)) !== null) {
    const colorName = match[1]; // 变量名称，例如 'primary-1' 或 'text-common-1'

    // 去掉前缀 (cus-, text-, gray-等)
    const keyName = colorName.replace(/^cus-|^text-|^gray-/, '');

    // 根据变量名称的前缀将其分类到不同类别
    if (colorName.startsWith('cus-primary')) {
      colors.primary[keyName] = `rgb(var(--${colorName}) , <alpha-value>)`;
    } else if (colorName.startsWith('cus-second') || colorName.startsWith('cus-gray')) {
      colors.second[keyName] = `rgb(var(--${colorName}) , <alpha-value>)`;
    } else if (colorName.startsWith('cus-relax') || colorName.startsWith('cus-info') || colorName.startsWith('cus-warning') || colorName.startsWith('cus-stress')) {
      colors.feature[keyName] = `rgb(var(--${colorName}) , <alpha-value>)`;
    } else if (colorName.startsWith('text')) {
      colors.text[keyName] = `rgb(var(--${colorName}) , <alpha-value>)`;
    }
  }

  // 创建 TypeScript 文件内容
  let colorFileContent = `/** tailwind快捷变量(eg. bg-primary-1)
 * text属性会收录下列除second外的其它色彩
 * 其它属性(bg、border...)会收录下列所有色彩
 * other的颜色一般不用放进来，除非你要用在tailwindcss里
 */

export const cusColors = {\n`;

  // 遍历颜色对象并生成 TypeScript 格式的内容
  Object.keys(colors).forEach((category) => {
    colorFileContent += `  ${category}: {\n`;
    const categoryColors = colors[category];
    Object.keys(categoryColors).forEach((color) => {
      colorFileContent += `    '${color}': '${categoryColors[color]}',\n`;
    });
    colorFileContent += `  },\n`;
  });

  colorFileContent += '};\n';

  // 将生成的内容写入 color.ts 文件
  fs.writeFile(tsFilePath, colorFileContent, (err) => {
    if (err) {
      console.error('Error writing TypeScript file:', err);
    } else {
      console.log('color.ts generated successfully!');
    }
  });



  /* 生成default.scss */
  const defaultScssFileContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

// 导入默认主题
@import './${DEFAULT_THEME}.scss';

:root {
  --default-theme: #{$theme-name}; 
}

@layer base {
    :root {
        @extend .primary;
        @extend .second;
        @extend .gray;
        @extend .feature;
        @extend .text;
        @extend .other;
    }
}
`

  fs.writeFile(`${themeDirPath}/default.scss`, defaultScssFileContent, (err) => {
    if (err) {
      console.error('Error writing TypeScript file:', err);
    } else {
      console.log('default.scss generated successfully!');
    }
  });


  /** 生成index.ts */
  fs.readdir(themeDirPath, (err, files) => {
    const scssFiles = files.filter(file => file.endsWith('.scss') && file !== 'default.scss' && file != `${DEFAULT_THEME}.scss`);

    var importText = '';
    scssFiles.forEach(file => {
      importText += `import './${file}';\n`;
    });

    const indexCssFileContent = `import './default.scss';

/* 导入除默认主题外的其它主题 */
${importText}
    `

    fs.writeFile(`${themeDirPath}/index.ts`, indexCssFileContent, (err) => {
      if (err) {
        console.error('Error writing TypeScript file:', err);
      } else {
        console.log('index.ts generated successfully!');
      }
    });
  })
});
