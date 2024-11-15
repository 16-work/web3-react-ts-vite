# README

> [文档链接](https://github.com/16-work/web3-react-ts-vite/blob/main/README.md)



**启动项目：**

```
pnpm i
```

```cmd
# 如需使用turbo，请执行本命令
pnpm build:packages 
```

```cmd
pnpm dev

# 如果不知道怎么改接口（见[二.2]），换用pnpm mock，里面有一些虚拟接口
pnpm mock
```

**安装包：**

由于使用了Turbo的缘故，装包需要`-w`

```
pnpm add -w 包名
```



> **备注：**
>
> - 第二、三部分的大部分内容，在源码里都有示例。
> - 如果没有示例，且文档写的确实太模糊，可以提醒我补充下。



## 一、技术栈

**基础：** React、typescript、vite

**状态管理：** zustand

**样式：** tailwindcss、antd、framer-motion

**其它：** axios、ahooks、turbo



## 二、基础功能

### 1. 环境变量

```
config
  --env
    --env.d.ts // 声明环境变量类型
    --.env.dev // 开发环境变量
    --.env.devProd // 测试环境变量
    --.env.production // 生产环境变量
    --.env.mock // 虚拟环境变量(无接口时用)
```



#### 1.1 定义环境变量

**举例：**

```ts
// config/env/.env.dev
VITE_ENV = 'dev' // 这个值最好不要删掉(除非你知道要改什么)
VITE_PORT = 8888
VITE_API_URL = 'http://dev-net.com/api'
```

```ts
declare interface MetaEnv {
    VITE_ENV: 'dev' | 'production' | 'mock'; // 这个值最好不要删掉(除非你知道要改什么)
    VITE_PORT: number;
    VITE_API_URL: string;
}
```



#### 1.2 调用环境变量

**举例：**

```ts
console.log(env.VITE_API_URL, typeof env.VITE_API_URL)
```



### 2. API相关

```
src
  ---api
    --模块名
      --index.ts // 定义接口方法
      --types.ts // 声明模块类型
    --axios.ts // axios相关配置
    --index.ts // 接口对外导出
    --types.ts // 接口通用类型
```



#### 2.1 定义模块api

**定义类型：**

```ts
// src/api/模块名/index.ts
export interface DTO方法名 {
    ...
}
```

**编写接口：**

```ts
// src/api/模块名/index.ts
export default {
    方法名: (dto: DTO方法名) => {
        return http.[method]<响应数据类型>(url, { ...dto });
    },
};
```

**对外导出：**

```ts
// src/api/index.ts
import 模块名 from './模块名';

export const api = { 模块名 };
```

**调用：**

```ts
const res = await api.模块名.方法名(参数);
```

**举例：**

示例见`@/api`目录下的common和token模块内容



#### 2.2 编写虚拟数据

```
--mock
  --模块名.mock.ts
```

**定义虚拟接口：**

```ts
// config/env/.env.mock
VITE_API_URL = '/api'
```

```ts
// mock/模块名.mock.ts
export default [
    mockAPI(method, url, data, otherInfo?),
] as MockMethod[];
```

**切换到虚拟环境：**

```
pnpm mock
```

**举例：**

示例见源码`mock`目录下的内容，和`@/api`下的内容是一一对应的。



### 3. 路由

```
--src
  --router
    --module // 模块路由
      --模块名.routes.ts // 模块路由文件
    --base.routes.ts // 定义无子级路由
    --path.ts // 定义路由对应的URL
```



#### 3.1 设置路由

**设置基础路由：**

- 定义路由URL

  ```ts
  // @/router/path.ts
  export const path = {
    无子级路由名: 'URL',
    
    // 举例
    list: '/list', // 静态路由
    detail: '/detail' // 动态路由（怎么导入见下）
  };
  ```

- 导入路由

  ```ts
  // @/router/base.ts
  export const baseRoutes: RouteObject[] = [
    ...
    {
      path: path.xxx,
      Component: 页面组件,
    },
      
    // 举例
    {
      path: path.list,
      Component: PageList,
    },
    {
      path: path.detail + '/:id',
      Component: PageDetail,
    },
  ];
  ```
  
  

**设置模块路由：**

- 定义路由URL

  ```ts
  // @/router/path.ts
  export const path = {
    模块路由名: {
    	子路由1名: '/该模块路由的固定前缀/子路由1的URL',
      子路由n名: '/该模块路由的固定前缀/子路由n的URL',
    }
      
    // 举例
    auth: {
      login: '/auth/login',
      register: '/auth/register'
    }
  };
  ```

- 新建模块路由`@/router/module/模块名.routes.ts`

- 编写模块路由

  ```ts
  // 示例见@/router/module/demo.routes.ts
  export default {
    path: '/该模块路由的固定前缀',
    children: [
      {
        path: path.该模块路由的固定前缀.子路由1名,
        Component: 子路由1组件,
      },
      {
        path: path.该模块路由的固定前缀.子路由n名,
        Component: 子路由n组件,
      },
    ],
  } as RouteObject;
  ```

  



#### 3.2 相关Hook

**路由跳转：**

```ts
// 基础跳转
router.push(path.xxx);
// 携带查询参数的跳转
router.push({ pathname: path.xxx, search: `?query名=query值` });
// 动态路由跳转
router.push(`path.xxx/${动态参数}`);
```

**获取路由参数：**

```ts
// 获取查询参数
router.query.get('查询参数名')
// 获取动态参数
router.params.动态参数名
```

**其它：**

```ts
// 获取当前路由信息
router.location
// 设置查询参数
router.query.set('查询参数名', value);
// 删除查询参数
router.query.del('查询参数名')
```



### 4. 样式相关

> **备注：**
>
> - 本项目绝大多数地方使用了tailwindcss来编写样式。
> - 如果实在不爱用tailwindcss，可以换用styles，示例见`@/components/CountDown`目录内容。
> - 用styles的话，可以不用管color.ts、sizes.ts，但SCREEN相关的部分要记得自己再调整下。



#### 4.1 屏幕类型

```
--config
  --constants
    --screen.ts
```

**设置：**

```ts
export enum SCREEN {
  XS = 0,
  MD = 1,
  LG = 2,
}

export const screenMinSize = {
  [SCREEN.XS]: 0,
  [SCREEN.MD]: 750,
  [SCREEN.LG]: 1340,
};
```

**使用举例：**

```ts
// ts使用
const { screenType } = store.global();

console.log(screenType >= SCREEN.MD);
```

```html
<!-- tailwind使用 -->
<div className="grid xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
```



#### 4.2 尺寸适配

```
--src
  --asset
    --css
      --base.scss
```



**固定尺寸：**

一般用于你有各端详细设计稿，且设计稿尺寸正常时

```
html {
  font-size: 16px;

  @media screen and (max-width: 750px) {
    font-size: 8px; // 移动端设计稿为2倍图(w-750)
    // font-size: 16px; // 移动端设计稿为1倍图(w-375)
  }
}
```



**动态尺寸：**

一般用于你没有各端详细设计稿，或设计稿尺寸不正常时。基础尺寸会随页面宽度变化。

```scss
$minFontSize: 12.8px;
$maxFontSize: 17.829px;
$minScreen: 430px;
$maxScreen: 1536px;

html {
  font-size: clamp($minFontSize, calc(7px + (($maxFontSize - $minFontSize) / ($maxScreen - $minScreen) * 100vw)), $maxFontSize);
}
```

```
// 可以拉动浏览器窗口观察元素尺寸变化
<div className="w-100 h-100 bg-black">1</div>
```





#### 4.3 安全区间

> 相关配置在`@/assets/css/common.scss`
>
> ???处请自行调整为需要的尺寸



**横向滚动条区间：**

```scss
// PC端屏幕最小宽度（防止x轴出现双重滚动条）
.pc-min-w {
  @apply md:min-w-???; 
}
```



**版心：**

```scss
// 版心(这里最好别加margin-y，防止有些奇怪的地方要用w时还得!my)
.w {
  @apply xs:w-full pc-min-w relative z-[1] mx-auto 
         md:max-w-??? xs:px-??? md:px-???;
}
// 顶部导航版心
.layout-nav-w {
  @apply w-full mx-auto 
         max-w-??? xs:px-??? md:px-???;
}
```



**页面最小高度：**

请根据页首和页尾高度自行调整???值

```scss
.page-min-h {
  @apply xs:min-h-[calc(100vh-???px)] md:min-h-[calc(100vh-???px)];
}
```



#### 4.4 主题

```
--src
  --assets
    --theme
      --default.scss // 设置默认主题
      --index.css // 导入除默认主题外的其它主题文件
      --主题文件名a.scss // 主题文件a
      --主题文件名b.scss // 主题文件b
```

**新建主题：**

在`@/assets/theme`下，新建`主题文件名.scss`

> 推荐命名：`theme-[light/dark]-主题色.scss`。
>
> [light/dark]是因为有些第三方组件是用light/dark来配置亮暗的。
>
> -主题色.scss是因为<SwitchTheme>会自动读取`主题色`作为需要显示的主题列表项。



**编写主题内容：**

- 在`@/assets/theme/主题文件名.scss`设置相关变量

  > 示例见：`theme-light-blue.scss`和`theme-light-green.scss`

  > 在此文件下配置的颜色，仅能以scss变量的颜色使用，如：`color: rgb(var(--cus-primary-1))`

- 在`config/tailwindcss/color.ts`设置相关变量

  > 示例见`config/tailwindcss/color.ts`默认内容
  
  > 在此文件下配置的颜色，可供tailwindcs使用，如`bg-primary-1`



**设置默认主题：**

- 在`@/assets/theme/default.scss`导入默认主题文件

  ```scss
  @import './主题文件名.scss';
  ```

- 在`@/assets/theme/index.css`导入除默认主题外的其它主题文件

  ```scss
  @import '@/assets/theme/主题文件名a.scss';
  @import '@/assets/theme/主题文件名b.scss';
  ```

  



#### 4.5 字体

```
--src
  --assets
    --font
      --index.scss // 引入字体文件
      --font-xxx.woff2 // 字体文件
    --css
      --base.scss // 设置默认字体
```

**设置字体：**

> 示例用的是非可变字体，可变字体设置方式类似，略

- 往`@/assets/font`下加入woff2格式的字体文件

- 在`@/assets/font/index.scss`定义字体名、字体类

  ```scss
  @font-face {
    font-family: '字体名';
    src: url('../font/字体文件名.woff2'); // 注意路径，根据引入者位置写
  }
  .字体类 {
    font-family: '字体名', $default-font-family;
  }
  ```

- 为`@/assets/css/base.scss`的`*`和`pre`设置默认字体

  ```scss
  * {
    ...
    @apply 默认字体类;
  }
  
  pre {
    ...
    @apply 默认字体类;
  }
  ```

**使用：**

```tsx
<div className="thin">1</div>
<div className="bold">1</div>
```



#### 4.6 通用类

```
--src
  --assets
    --css
      --antd.scss // 第三方UI库(本项目使用antd)
      --text.scss // 文字
      --button.scss // 按钮
      --input.scss // 输入框
      --focus.scss // 激活样式
      --position.scss // 定位
      --gradient.scss // 渐变
      --animation.scss // 动画
      --plugin.scss // 其它插件
      
```



#### 4.7 图标

**SVG用法：**

- 将`icon名.svg`放入`@/assets/icon`目录下

- ```tsx
  <Svg name="icon名" className={`w-??? ...`} ...其它属性/>
  ```

**Lottie用法：**

- 将`icon名.json`放入`@/assets/lottie`目录下

- ```tsx
  <Lottie name="icon名" className={`w-??? ...`} ...其它属性/>
  ```



#### 4.8 样式规范

- 有多个尺寸时，按左小右大的顺序编写样式

  ```ts
  // 举例：正确
  className="xs:w-100 md:w-50"
  
  // 举例：错误
  className="md:w-50 xs:w-100"
  ```

- 非公共样式且内含变量的部分最好带一个标识类名，便于调试。公共样式如果希望不太容易被认出项目风格，可以不加标识类名。

- className请尽量按照以下顺序编写（增加可读性）

  ```tsx
  className="标识类名 
    不可改类名(无论如何该样式必须用到的类名)
    公共类名
    group 显示模式
    宽高 
    定位 translate
    flex/grid
    margin、pading（上、下、左、右）
    边框 背景 圆角 阴影
    文本(字色、字号、粗细、其它文本类)
    其它
    动态类名
  "
  
  // 举例
  className="page-home 
    overflow-hidden 
    box-1
    group block
    min-h-250 
    relative translate-y-1/2
    flex-align-y gap-y-10
    mt-20 mb-20
    border-1 group-hover:border-2 bg-black hover:bg-white round-20 shadow-lg
    text-common-1 hover-primary
    duration-300 
    ${props.className}
  "
  ```

- 尽量全部使用主题内的颜色（否则后续一旦有换主题的需求，又要改一遍）

  ```scss
  // 举例：建议
  background: rgb(var(--cus-gray-900));
  
  // 举例：不建议
  background: #333;
  ```

  

### 5. 多语言

#### 5.1 基础使用

**生成多语言文件：**

- 编写xlsx表格，格式类似以下（encode列必须在第1列），替换`@/constants/i18n/script/i18n.xlsx`

  | encode | zh-CN | en   | ...  |
  | ------ | ----- | ---- | ---- |
  | 变量名 | 中文  | 英文 | ...  |

- 生成语言文件

  ```
  pnpm i18n
  ```

**调用：**

```tsx
// tsx
const { t } = useTranslation();
t('工作表名.变量名')
```

```ts
// ts
import { t } from 'i18next';
t('工作表名.变量名')
```



#### 5.2 语言相关配置

```ts
// @/constants/i18n/config.ts
/* 支持的语言 */
export const languageType = ['zh-CN', 'zh-TW', 'en'];

/* 可选的语言 */
export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh-TW' },
];

/* 需要转换的语言 */
export const convertLanguageMap: Record<string, string> = {
  'zh-CN': 'zh-TW', // 部分项目会要求将简中转为繁中
};

/* 默认语言方案 */
const plan: number = 1;

/* 系统语言不在支持列表内时，默认显示的语言 */
const finishLanguage = 'en';
```



#### 5.3 语言转换

项目示例开启了zh-CN转zh-TW，如果希望关闭该设置，需要进行以下操作：

- 启用简中可选

  ```ts
  // @/constants/i18n/config.ts
  export const languageOptions = [
    { label: 'English', value: 'en' },
    { label: '简中', value: 'zh-CN' },
    { label: '繁中', value: 'zh-TW' },
  ];
  ```

- 注释转换项

  ```ts
  // @/constants/i18n/config.ts
  export const convertLanguageMap: Record<string, string> = {
    // 'zh-CN': 'zh-TW', // 部分项目会要求将简中转为繁中
  };
  ```

- 开启zh-CN文件生成

  ```ts
  // @/constants/i18n/script/excelToLang.js
  const generateList = ['en', 'zh-CN', 'zh-TW'];
  ```

- 重新生成语言文件

  ```
  pnpm createi18n
  ```

  

#### 5.4 第三方组件语言

一些第三方组件的语言需要单独配置，举例见`AntdProvider.tsx`和`WalletProvider.tsx`

```ts
// @/components/Base/AntdProvider.tsx
import en from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import zhTW from 'antd/locale/zh_TW';

...

  const locale = useMemo(() => {
    switch (i18n.language) {
      case 'zh-CN':
        return zhCN;
      case 'zh-TW':
        return zhTW;
      default:
        return en;
    }
  }, [i18n.language]);
```

```ts
// @/components/Wbe3/WalletProvider.tsx
  const locale = useMemo(() => {
    switch (i18n.language) {
      case 'zh-CN':
        return 'zh';
      case 'zh-TW':
        return 'zh';
      default:
        return 'en';
    }
  }, [i18n.language]);
```



### 6. 表单验证

#### 6.1 定义规则

**定义接口：**

```ts
interface DTOFields {
  ...
}
```

**编写规则：**

```ts
const schema = useMemo(() => {
  return {
    字段名: yup.验证规则().label(t('字段多语言变量名')),
}, [t]);
```

**常见规则：**

```ts
// 必填
yup.required()
```

```ts
// 字符串相关
yup.string().min(1).max(10)
```

```ts
// 数字相关
yup.number().min(1).max(10).positive().integer()
```

```ts
// 正则
yup.matches(正则表达式, () => 'msg')

/* 常用正则 */
/^[a-zA-Z0-9]+$/   // 英文|数字
/^[\w-]*$/   // 字母、数字、_和-
/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/  // 英文|数字|中间空格
```

```ts
// 自定义规则
yup.test('自定义规则名', '错误提示', (value) => {
  // value是该字段当前值
  // 从this.parent能取到其它字段值
  const { 字段名 } = this.parent;
  
  return bool;
}),

/* 常用自定义规则 */
// 验证是否为网站
return !value || /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/.test(value);
```

```ts
// 其它常用规则
password_confirm: yup.oneOf([yup.ref('password')], '两次密码输入不一致')
```



#### 6.2 相关Hook

**基础：**

```ts
const { fields, beforeSubmit, errors, errorMsg, setValue } = useForm<DTOFields>(schema, {
  字段名: 默认值
});
```

**取各字段值：**

```ts
const { 字段名1 , 字段名n = 默认值 } = useWatch({ control });
```

**绑定字段：**

```tsx
// 简单绑定
<input autoComplete="off"  {...fields('字段名')} />

// 手动绑定
<input value={value} onChange={(e)=>setValue('字段名', e.target.value)} />
```

```tsx
// 提交前验证
<button onClick={beforeSubmit(onSubmit)} >Submit</button>
```



### 7. Store

```
--src
  --store
    --index.ts // 导入store模块
    --global // 全局模块
    --user // 用户模块
    --transaction // web3交易模块
```



#### 7.1 基础使用

**创建Store模块：**

- 新建`@/store/模块名/types.ts`、`@/store/模块名/index.ts`

  ```ts
  // @/store/模块名/types.ts
  export interface 模块接口 {
    ...
  }
  ```

  ```ts
  // @/store/模块名/index.ts
  import { create } from 'zustand';
  import { GlobalStore } from './types';
  import { devtools, persist } from 'zustand/middleware';
  
  export default create<模块接口>()(
    devtools(
      persist(
        (set) => ({
  
        }),
        { name: '模块名' }
      )
    )
  );
  ```

- 导入store

  ```ts
  // @/store/index.ts
  import 模块名 from './模块名';
  
  export const store = { 模块名 };
  ```

**使用Store：**

```ts
// 举例
const { isPC, setIsPC } = store.global();
```



#### 7.2 常用Store介绍

**global：**

```ts
theme & setTheme 主题

isPC & setIsPC 是否为PC端

screenType & setScreenType 屏幕类型

tasks & setTask 存储异步任务列表

isOpenDrawer & setIsOpenDrawer 打开移动端主抽屉

usdtUnitPrice & setUsdtUnitPrice USDT单价

tokenIconList & setTokenIconList 代币列表
```

**user：**

```ts
isShowVerifyTip & setIsShowVerifyTip 是否显示401提示

usersToken & setUsersToken 用户token列表
```

**transaction：**

别动，和交易提示相关



### 8. AHooks

#### 8.1 响应式数据

```ts
const state = ahooks.reactive({
  变量名: 值
});

// 可以直接赋值，不用像useState那样setValue
state.变量名 = 新值;
```



#### 8.2 异步请求

```ts
const { run: 方法名, isLoading } = ahooks.request(
    async () => {
        /* before */
    

        /* main */


        /* success */
    },
    // error(可省略)
    (e) => {},
    // 其它配置(可省略)
    {}
);
```



#### 8.3 带锁异步

```ts
// isLoading是局部加载状态，task是非局部加载状态(可外部控制)
const { run: 方法名, isLoading, task } = ahooks.lockFn(async () => {
    /* before */
    

    /* main */


    /* success */
    
});
```

**其它：**

- [文档](https://ahooks.js.org/zh-CN/hooks/use-request/index)
- 使用时都是`ahooks.去掉use的hook名`





### 9. Context

**定义Context：**

```ts
// @/constants/demo.ts
export const contextInitValue: TypeContext = {
  属性名: 默认值,
};

export type TypeContext = {
  属性名: 类型;
};

export const ContextDemo = createContext({ ...contextInitValue });
```

**使用Provider：**

```tsx
// 祖先组件
import { ContextDemo, contextInitValue } from '@/constants/context/demo';

/** Component */
export const Father = () => {
  /** Params */
  const context = ahooks.reactive({ ...contextInitValue });

  /** Template */
  return (
    
      <ContextDemo.Provider value={context}>
        <Child />
      </ContextDemo.Provider>
  );
};
```

**调用Context：**

```tsx
import { ContextDemo } from '@/constants/context/demo';

const Child = () => {
  /** Retrieval */
  const context = useContext(ContextDemo);

  /** Template */
  return <div>{context.属性名}</div>;
};
```





## 三、Web3相关

### 1. 钱包

**账户信息：**

```tsx
const account = useAccount();
account.xxx
```

**连接/登出：**

```ts
hooks.wallet.connect()
hooks.wallet.disconnect()
```

**签名：**

```ts
hooks.wallet.verify()
```



### 2. 链

**获取当前链：**

```ts
const account = useAccount();

// 链Id
account.chain.id

// 判断是否在支持的链上
account.chain ? '在' : '不在'
```

**配置项目链：**

```ts
// @/constants/chains.ts
// 默认链
export const DEFAULT_CHAIN = {
  PROD: chains.mainnet,
  DEV: chains.sepolia,
};
...

// 支持的链（不要直接用chain[]，因为contracts那里要用到id的类型提示）
export const SUPPORT_CHAINS = env.VITE_ENV === 'production' ? [DEFAULT_CHAIN.PROD.id, chains.其它链n主网.id] : [DEFAULT_CHAIN.DEV.id, chains.其它链n测试网.id];

// 链图标
export const CHAINS_ICON: Record<number, string> = {
  // 记得加入图片@/assets/icon/svg图片名.svg
  [DEFAULT_CHAIN_CURRENT.id]: 'chain-default', // chain-default是演示的svg图片名
  
  [chains.其它链n主网.id]: 'chain-n',
  [chains.其它链n测试网.id]: 'chain-n',
};

// 链Symbol
export const CURRENCY_SYMBOL = DEFAULT_CHAIN_CURRENT.nativeCurrency.symbol;
```

**切换链：**

```ts
hooks.wallet.switchChain()
```



### 3. 合约

#### 3.1 导入合约

- 往`@/constants/abi`目录下加入`合约名.ts`

  ```ts
  // @/constants/abi/合约名.ts
  export const ABI名 = [...];
  ```

- 设置合约地址

  ```ts
  // @/constants/contracts.ts
  export const contracts = {
    合约名: {
      [DEFAULT_CHAIN.PROD.id]: '主网合约地址',
      [DEFAULT_CHAIN.DEV.id]: '测试网合约地址',
        
      [chains.其它链n主网.id]: '主网合约地址',
      [chains.其它链n测试网.id]: '测试网合约地址',
    },
  } as const satisfies Record<string, Record<(typeof SUPPORT_CHAINS)[number], `0x${string}`>>;
  ```



#### 3.2 使用合约Hook

**初始化合约Hook：**

往`@/hooks/contract`目录下新增`use合约名.ts`

```ts
// @/hooks/contract/use合约名.ts
import { ABI名 } from '@/constants/abi/合约名';
import { contracts } from '@/constants/contracts';

/** Hook */
export const use合约名 = () => {
  /** Params */
  const contractConfig = {
    address: contracts.合约名 | Address, // address也可以传普通的合约地址(不会根据chainId变化)
    abi: ABI名,
  };

  /** Actions */
  

  /** Return */
  return {  };
};
```

**编写合约方法：**

```ts
// @/hooks/contract/use合约名.ts
export const use合约名 = () => {
  ...
  
  /** Actions */
  // 写合约 (stateMutability = 'nonpayable' | 'payable')
  const writeFunc = (task: Task, params: { 参数1: any, 参数n: any }, value?: bigint) => {
    return hooks.contract.write(task, {
      ...contractConfig,
      functionName: 'functionName', // 见合约方法的name
      args: [params.参数1, params.参数n], // 见inputs
      value, // stateMutability: 'payable' 时需要传入该参数
    });
  };

  // 读合约 (stateMutability = 'view')
  const readFunc = async (params: { 参数1: any, 参数n: any }) => {
    const res = await hooks.contract.read({
      ...contractConfig,
      functionName: 'functionName', // 见合约方法的name
      args: [params.参数1, params.参数n], // 见inputs
    });

    return res;
  };
    
  // 批量请求
  const multicallFunc = async (args: any[]) => {
    const res = await hooks.contract.multicall([
      {
        ...contractConfig,
        functionName: 'functionName1',
        args,
      },
      // 下面的address就是普通的合约地址
      {
        address: '0x...',
        abi: ABIDemo,
        functionName: 'functionName2',
        args,
      },
    ]);

    return res;
  };

  /** Return */
  return { writeFunc, readFunc, multicallFunc };
};
```

**调用合约：**

```ts
const { 合约方法 } = use合约名();
await 合约方法()
```

**配合task获取成功状态：**

```tsx
const { 写合约方法名 } = use合约名();
const { run, task } = ahooks.lockFn(async () => {
    await 写合约方法名(task, { 参数1: 1, 参数n: 'n' });
});
```

```ts
const 写合约方法名 = (task: Task, params: { 参数1: any, 参数n: any }, value?: bigint) => {
  return hooks.contract.write(task, {
    ...contractConfig,
    functionName: 'functionName',
    args: [params.参数1, params.参数n],
    value,
  });
};
```

```tsx
<!-- 这样交易成功或失败后才会停止loading -->
<Button isLoading={task.status === 0} onClick={run}>
  Test Task
</Button>
```



#### 3.3 监听合约事件

**定义事件：**

```ts
// @/constants/events.ts
export const EVENTS = {
  事件名: '事件',
};
```

**监听事件：**

```ts
const callback = ()=>{};

useEffect(() => {
  events.on(EVENTS.事件名, callback);
  return () => {
    events.off(EVENTS.事件名, callback);
  };
}, []);
```



## 四、其它常用功能

### 1. 通用组件

#### 1.1 公共组件概览

```ts
--src
  --components // 该目录下的组件(除Feature内的)都会被收录到auto-import里
    --Feature // 通用业务组件目录(该目录下的组件不会被收录到auto-import里)
    
    --Animation // 动画组件
      --AnimationNum.tsx // 数字滚动
      --AnimationRoute.tsx // 路由动画

    --Base // 基础组件
      --AntdProvider.tsx // Antd全局配置
      --Button.tsx // 按钮
      --Copy.tsx // 复制
      --Drawer.tsx // 抽屉
      --DropList.tsx // 下拉列表
      --Img.tsx // 图片
      --Loading.tsx // 加载中
      --Modal.tsx // 模态框
      --Progress.tsx // 进度条
      --NoDate.tsx // 空数据
      --Scrollbar.tsx // 滚动条
      --Skeleton.tsx // 骨架屏

    --Box // 盒子
      --BoxCollapse.tsx // 可折叠盒子
      --FieldItem.tsx // 表单项

    --CountDown //倒计时
      --CountDownBase.tsx // 无样式，只返回日时分秒值
      --CountDownFlip.tsx // 翻页倒计时

    --Icon 图标
      --Lottie.tsx // Lottie动画
      --Svg.tsx // Svg图片
      --TokenIcon.tsx // token图标

    --Input 输入框
      --InputNum.tsx // 数字输入框(支持大数)
      --InputSearch.tsx // 搜索框
    
    --Pager // 分页器
      --Pager.tsx // 基础分页器
      --PagerSimple.tsx // 无总数分页器

    --Popover 弹出提示
      --PopoverText.tsx // 文本弹出提示
      --PopoverTip.tsx // 解释弹出提示

    --LoadMore // 加载更多
      --AllDataScrollLoad.tsx // 无限滚动(列表只取一次且超多条数据时可以考虑用)

    --Switch // 切换组件
      --CheckBox.tsx // 复选框
      --Radio.tsx // 单选框
      --Tabs.tsx // Tabs切换
      --TabPanels.tsx // Tab切换面板

    --Table // 表格
      --FieldSort.tsx // 表头项排序按钮
      --Table.tsx // 可排序、带骨架屏的表格
      --TCol.tsx // 表格列
    
    --Upload // 上传
      --UploadImg.tsx // 上传图片
   
    --Web3 // Web3组件
      --VerifyTip // 验证提示
      --WalletProvider.tsx // 钱包
```



#### 1.2 表格组件

**简单示例：**

```ts
/* Constants*/
const classNames = {
  gridCols: 'xs:grid-cols-2 md:grid-cols-3',
  cols: { 0: 'xs:col-span-2 md:col-span-1' },
  thead: 'px-40',
  row: 'px-40',
};

/** Component */
export const TableSample = () => {
  /** Retrieval */

  /** Params */
  const state = ahooks.reactive({
    list: [
      { id: 1, name: 'Tom', age: 18 },
      { id: 2, name: 'Amy', age: 20 },
    ],
    isInit: false,
    isLoading: false,
  });

  /** Actions */

  /** Template */
  return (
    <Table
      state={state}
      elements={{
        labels: ['Id', 'Name', 'Age'],
        cols: (item) => [<span>{item.id}</span>, <span>{item.name}</span>, <span>{item.age}</span>],
        skeletons: [<Skeleton className="w-100 h-25" />, <Skeleton className="w-100 h-25" />, <Skeleton className="w-100 h-25" />],
      }}
      sort={{
        sortFields: { 0: 'id', 2: 'age' },
        onSort: (field, sort) => {
          state.list.sort(tools.compare(field, sort));
        },
      }}
      classNames={classNames}
    />
  );
};
```

**拆分示例：**

如果表格内容比较复杂，不想挤一个文件里，可以类似下面这样拆分

```tsx
// .../Table/index.tsx
import { TRow } from "./TRow";

/** Constants */
const classNames = {
  gridCols: 'xs:grid-cols-2 md:grid-cols-3',
  cols: { 0: 'xs:col-span-2 md:col-span-1' },
  thead: 'px-40',
  row: 'px-40',
};

/** Component */
export const TableSample = () => {
  /** Retrieval */
  const { cols, skeletons } = TRow();

  /** Params */
  const state = ahooks.reactive({
    list: [
      { id: 1, name: 'Tom', age: 18 },
      { id: 2, name: 'Amy', age: 20 },
    ],
    isInit: false,
    isLoading: false,
  });

  /** Actions */

  /** Template */
  return (
    <>
      <div onClick={() => state.list.push({ id: 3, name: 'Jane', age: 22 })}>Add</div>
      <Table
        state={state}
        elements={{
          labels: ['Id', 'Name', 'Age'],
          cols: (item) => cols(item),
          skeletons: skeletons,
        }}
        sort={{
          sortFields: { 0: 'id', 2: 'age' },
          onSort: (field, sort) => {
            state.list.sort(tools.compare(field, sort));
          },
        }}
        classNames={classNames}
      />
    </>
  );
};
```

```tsx
// .../Table/TRow.tsx
export const TRow = () => {
  /** Retrieval */
  const { isPC } = store.global();

  /** Cols */
  const cols = (item: any) => [<span onClick={() => console.log(isPC)}>{item.id}</span>, <span>{item.name}</span>, <span>{item.age}</span>];

  /** Skeleton */
  const skeletons = [<Skeleton className="w-100 h-40" />, <Skeleton className="w-100 h-40" />, <Skeleton className="w-100 h-40" />];

  /* Return */
  return { cols, skeletons };
};
```



### 2. 常用工具

#### 2.1 本地存储

```ts
// @/types/cacheKey.ts
export type CacheKey = '键名' | ...;
```

```ts
localCache.get('键名'); // 取值
localCache.set('键名', 值) // 设值
```



#### 2.2 格式化

```ts
// 数字格式化(支持大数)
format.bignum(数值, 小数位, 数字缩写)

// eg.
format.bignum('123456.789', 2); // 123,456.78
format.bignum('123456.789', 2, "K"); // 123.46 K (从K位开始缩写)
format.bignum('12345678910', 2, "K"); // 12.35 B
```

```ts
// 代币值精度格式化
format.token.common(代币值(数量|价格...), {
    decimal?: 代币精度(默认18), 
    bignumDecimal?: 格式化后小数位数, 
    abbrOrigin?: 大于指定值后开始缩写
})

// eg.
format.token.common(token.balance, {abbrOrigin: "M"});
format.token.common(BigNumber(token.amount).times(token.price));

// 代币价格格式化（这个请去看代码中的注释后再用）
format.token.usdt(代币价格, {
    decimal?: 代币精度(默认18), 
    bignumDecimal?: 格式化后小数位数, 
    abbrOrigin?: 大于指定值后开始缩写
})

// eg.
format.token.usdt(token.price, { decimal: 0 }) // 请根据传入代币价格的精度变化decimal（示例price是1Token的价格，不是1Wei的价格，所以decimal为0而不是18）
format.token.usdt(BigNumber(total.supply).times(token.price), { abbrOrigin: "K" }) // 这里supply精度是18，price精度0，所以decimal用默认值就行
```

```ts
// 其它见@/utils/format.ts，用法都是format.xxx
```



#### 2.3 通知

```ts
// 可操作通知(显示于右上角)
toast.<类型>('信息');

// 普通通知(显示于正上方)
msg.<类型>('信息');
```



#### 2.4 其它小工具

```ts
// 复制
tools.copy('值');

// 其它见@/utils/tools.ts，用法都是tools.xxx
```

