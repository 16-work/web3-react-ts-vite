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

**使用Turbo：**

- 把`pnpm-workspace.demoyaml`改为`pnpm-workspace.yaml`

- 使用Turbo后，装包需要`-w`

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
    --.env.test // 测试环境变量
    --.env.prod // 生产环境变量
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
    VITE_ENV: 'dev' | 'test' | 'prod' | 'mock'; // 这个值最好不要删掉(除非你知道要改什么)
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
  [SCREEN.MD]: 750, // 750px一般属于移动屏
  [SCREEN.LG]: 1340,
};
```

**使用举例：**

```ts
// ts使用
const { screenType } = store.global();

console.log(screenType > SCREEN.MD);
```

```html
<!-- tailwind使用 -->
<div className="grid xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
```



#### 4.2 响应式方案

```
--src
  --assets
    --css
      --base.scss
```



**固定尺寸：**

每个屏宽一种固定的根字号。

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

根字号随屏宽动态变化。

```scss
$MDMinFontSize: 12px;  // 中屏最小根字号
$MDMaxFontSize: 16px; // 中屏最大根字号
$MDMinScreen: 750px; // 中屏最小屏幕宽度
$MDMaxScreen: 1920px; // 中屏最大屏幕宽度

$XSMinFontSize: 8px;  // 小屏最小根字号
$XSMaxFontSize: 16px; // 小屏最大根字号
$XSMinScreen: 375px; // 小屏最小屏幕宽度
$XSMaxScreen: 750px; // 小屏最大屏幕宽度

html {
  // 大于最大范围时的默认根字号
  font-size: 16px; 
 
  // 小于最小范围时的默认根字号
  @media screen and (max-width: $XSMinScreen) {
    font-size: 8px; // 移动端设计稿为2倍图(w-750)
    // font-size: 16px; // 移动端设计稿为1倍图(w-375)
  }

  // 中屏动态根字号
  @media screen and (min-width: $MDMinScreen) and (max-width: $MDMaxScreen) {
    font-size: calc(
      $MDMinFontSize + (($MDMaxFontSize - $MDMinFontSize) / ($MDMaxScreen - $MDMinScreen)) * (100vw - $MDMinScreen)
    );
  }

  // 小屏动态根字号
  @media screen and (min-width: $XSMinScreen) and (max-width: $XSMaxScreen) {
    font-size: calc(
      $XSMinFontSize + (($XSMaxFontSize - $XSMinFontSize) / ($XSMaxScreen - $XSMinScreen)) * (100vw - $XSMinScreen)
      ) ;
  }
}
```

```
// 可以拉动浏览器窗口观察元素尺寸变化
<div className="w-100 h-100 bg-black">1</div>
```





#### 4.3 布局配置

```scss
// @/assets/css/layout.scss
/* 顶部导航配置 */
#layout-nav {
  @apply max-w-1650  /* 最大宽 */
  xs:h-80 md:h-60  /* 导航高度(修改后,需要同步修改第11行) */
  xs:px-20 md:px-40;  /* 安全边距 */
}

/* 页面主体配置 */
#layout-main {
  @apply xs:min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-80px)] /* 最小高度 = 100vh - 页脚高度 (移动端用了2倍图，这里计算要/2；别用ts设置,否则开始时会屏闪) */
  xs:pt-100 md:pt-80;  /* 距离顶部的距离 = 导航高度 + 距离顶部的边距 */

  // 版心
  .w {
    @apply max-w-1340  /* 最大宽 */
    xs:px-20 md:px-40;  /* 安全边距 */
  }
}

/* 页脚配置 */
#layout-footer {
  @apply max-w-1340  /* 最大宽 */
  xs:h-100 md:h-80  /* 页脚高度(修改后,需要同步修改第10行) */
  pt-20 xs:px-20 md:px-40;  /* 安全边距 */
}
```



#### 4.4 主题

```
--src
  --constants
    --common.ts // 里面有设置默认主题的变量DEFAULT_THEME
  --assets
    --theme
      --主题文件名a.scss // 主题文件a
      --主题文件名b.scss // 主题文件b

	  // 下面两个文件不用管，会自动生成
      --default.scss
      --index.ts
```



**新建主题：**

- 在`@/assets/theme`下，新建`主题文件名.scss`

  > 推荐命名：`theme-[light/dark]-主题色.scss`。
  >
  > [light/dark]是因为有些第三方组件是用light/dark来配置亮暗的。
  >
  > -主题色.scss是因为<SwitchTheme>会自动读取`主题色`作为需要显示的主题列表项。

- 在`@/assets/theme/主题文件名.scss`设置相关变量

  > 示例见：`theme-light-blue.scss`和`theme-light-green.scss`

  > 在此文件下配置的颜色，仅能以scss变量的颜色使用，如：`color: rgb(var(--cus-primary-1))`

- 执行`pnpm theme`



**修改默认主题：**

- 修改`@/constants/common.ts`的`DEFAULT_THEME`

  ```ts
  export const DEFAULT_THEME = '主题文件名';
  ```

- 执行`pnpm theme`



**重要：**

如果修改了`DEFAULT_THEME`，或改动`theme-xxx.scss`结构，需执行以下命令才会生效

```
pnpm theme
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
export const supportLanguages = {
  en: 'English',
  'zh-CN': '简体中文',
  // 'zh-TW': '繁体中文',
};

export const languageConfig = {
  /* 初始语言 */
  initLanguage: 'en',

  /* 默认语言: 必定支持的语言 */
  defaultLanguage: 'en',

  /** 默认语言方案
   * 方案1：默认为指定语言
   * 方案2: 默认跟随浏览器语言（支持语言自动转换）
   */
  plan: 1,

  /* 需要转换的语言 */
  convertLanguageMap: {
    // 'zh-CN': 'zh-TW', // 部分项目会要求将简中转为繁中
  } as Record<string, string>,
};
```



#### 5.3 语言转换

**举例：**zh-CN转zh-TW

- 支持zh-TW

  ```ts
  // @/constants/i18n/config.ts
  export const supportLanguages = {
    'zh-TW': '繁体中文',
  };
  ```

- 添加转换项

  ```ts
  // @/constants/i18n/config.ts
  export const languageConfig = {
    // ...
    convertLanguageMap: {
      'zh-CN': 'zh-TW',
    } as Record<string, string>,
  };
  ```

- 重新生成语言文件

  ```
  pnpm createi18n
  ```

  

#### 5.4 第三方组件语言

一些第三方组件的语言需要单独配置，举例见`ProviderAntd.tsx`和`ProviderWallet.tsx`

```ts
// @/components/Providers/ProviderAntd.tsx
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
// @/components/Providers/ProviderWallet.tsx
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
const state = useReactive({
  变量名: 值
});

// 可以直接赋值，不用像useState那样setValue
state.变量名 = 新值;
```



#### 8.2 异步请求

```ts
const { run: 方法名, isLoading } = useRequest(
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
const { run: 方法名, isLoading, task } = useLockFn(async () => {
    /* before */
    

    /* main */


    /* success */
    
});
```

**其它：**

- [文档](https://ahooks.js.org/zh-CN/hooks/use-request/index)





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
  const context = useReactive({ ...contextInitValue });

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
// @/constants/chain/index.ts
// 默认链
export const DEFAULT_CHAIN = {
  PROD: chains.mainnet,
  DEV: chains.sepolia,
};
...

// 支持的链（不要直接用chain[]，因为contracts那里要用到id的类型提示）
export const SUPPORT_CHAINS = env.VITE_ENV === 'prod' ? [DEFAULT_CHAIN.PROD.id, chains.其它链n主网.id] : [DEFAULT_CHAIN.DEV.id, chains.其它链n测试网.id];

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

#### 3.1 导入IDL

- 导入IDL

  ```ts
  // @/constants/idl/index.ts
  export const IDL = {...};
  ```

- 复制IDL的值作为类型

  ```ts
  // @/constants/idl/type.ts
  export type IDLType = IDL的值;
  ```
  
  

#### 3.2 使用合约Hook

**初始化合约Hook：**

往`@/hooks/contract`目录下新增`use合约名.ts`

```ts
// @/hooks/contract/use合约名.ts
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAnchorProvider } from './useAnchorProvider';
import { useProgram } from './useProgram';
import { TransactionInstruction } from '@solana/web3.js';
import { useContract } from '.';
import { Task } from '@/store/global/types';

export const use合约名 = () => {
  /** Retrieval */
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const { writeContract } = useContract();
  const anchorPriovider = useAnchorProvider();

  /** Params */

  /** Actions */
  

  /** Return */
  return { };
};
```

**编写合约方法：**

```ts
// @/hooks/contract/use合约名.ts
export const use合约名 = () => {
  // ...

  /** Actions */
  const 写合约方法名 = useCallback(
    async (task: Task, args: any, accountParams: any) => {
      if (!anchorPriovider || !wallet || !program) return;

      const instructions: TransactionInstruction[] = [];
      instructions.push(
        await program.methods
          .functionName(...args)
          .accounts({
            ...accountParams,
            signer: wallet.publicKey,
            program: program.programId,
          })
          .instruction()
      );

      return await writeContract(task, { instructions });
    },
    [anchorPriovider, program, wallet, writeContract]
  );

  /** Return */
  return { 写合约方法名 };
};
```

**调用合约：**

```ts
const { 合约方法名 } = use合约名();
await 合约方法名()
```

**配合task获取成功状态：**

```tsx
const { 写合约方法名 } = use合约名();
const { run, task } = useLockFn(async () => {
    await 写合约方法名(task, { 参数1: 1, 参数n: 'n' });
});
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
      --FormDemo.tsx // 表单验证示例
    
    --Animation // 动画组件
      --AnimationBox.tsx // 动画盒子(让元素渐入渐出)
      --AnimationNum.tsx // 数字滚动
      --AnimationRoute.tsx // 路由动画

    --Base // 基础组件
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
      --BoxList.tsx // 翻页列表
      --FieldItem.tsx // 表单项

    --CountDown //倒计时
      --CountDownBase.tsx // 无样式，只返回日时分秒值
      --CountDownFlip.tsx // 翻页倒计时

    --Editor
      --Editor.tsx // 富文本编辑框

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

    --Providers
      --index.tsx
      --ProviderAntd.tsx // Antd配置
      --ProviderWallet.tsx // 钱包配置

    --LoadMore // 加载更多
      --AllDataScrollLoad.tsx // 无限滚动(列表只取一次且超多条数据时可以考虑用)

    --Switch // 切换组件
      --CheckBox.tsx // 复选框
      --Radio.tsx // 单选框
      --Slider.tsx // 滑动选择条
      --Tabs.tsx // Tabs切换

    --Table // 表格
      --FieldSort.tsx // 表头项排序按钮
      --Table.tsx // 可排序、带骨架屏的表格
      --TCol.tsx // 表格列
    
    --Upload // 上传
      --UploadImg.tsx // 上传图片
   
    --Web3 // Web3组件
      --VerifyTip // 验证提示
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
  const state = useReactive({
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
  const state = useReactive({
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



#### 1.3 滚动条

**举例：**

```tsx
<div className="box-father    w-400 h-400">
  {/* ScrollBar 宽高会自动跟随box-father */}
  <Scrollbar>
    {/* box-children长宽超过box-father时会出现滚动条 */}
    <div className="box-children    w-[2000px] h-[2000px]">Scroll Bar</div>
  </Scrollbar>
</div>
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

**数字格式化：**

```ts
// 数字格式化(支持大数)
format.bignum(数值, 小数位, 是否开启数字缩写, 数字缩写起始位置)

// eg.
format.bignum('123456.789', 2); // 123,456.78
format.bignum('123456.789', 2, true, "K"); // 123.46 K (从K位开始缩写)
format.bignum('12345678910', 2, true, "K"); // 12.35 B
```



**代币格式化：**

> format.token.usdt这个方法有点复杂，可以先阅读下方公式、源码、及示例分析后，再使用。
>
> ```ts
> /** 相关公式 */ 
> 
> /* 1.主货币常见单位换算 */ 
> 1 (currency) = 10^decimals (wei) // eg. decimals(eth) = 18;  decimals(sol) = 9
> 
> /* 2.总价公式 */
> TotalPrice(currency) 
>     = Price(currency/token) * Amount(token) 
>     = Price(currency/token) * Amount(wei) / 10^decimals
> 
> /* 3.美元总价公式 */
> UsdtPrice(usdt) 
>     = CurrencyUsdtUnitPrice(usdt/currency) * TotalPrice(currency)
>     = CurrencyUsdtUnitPrice(usdt/currency) * Price(currency/token) * Amount(token) 
>     = CurrencyUsdtUnitPrice(usdt/currency) * Price(currency/token) * Amount(wei) / 10^decimals
> ```

```ts
// 代币价格格式化（示例currencyUsdtUnitPrice的单位是(usdt/currency)）
format.token.usdt(代币价格, {
    decimals?: 精度(默认9), 
    bignumDecimals?: 格式化后小数位数, 
    isAbbr?: 是否开启数字缩写,
    abbrOrigin?: 大于指定值后开始缩写
})

// eg.
/** 示例分析1:
 * 设 实参price 的单位是(currency/token)
 * 套用上面公式(usdt/currency) * (currcncy/token) = (usdt/token)
 * 已知 目标price 的单位是(usdt/token)
 * 计算结果的单位和目标单位正好匹配
 * 因此：decimals为0
*/
format.token.usdt(token.price, { decimals: 0 }) 

/** 示例分析2:
 * 设 实参price 的单位是(currency/token)、实参amount的单位是(wei)
 * 套用上面公式(usdt/currency) * (currcncy/token) * (wei)= (usdt / token * wei )
 * 已知 目标totalPrice 的单位是(usdt)
 * 计算结果的单位还需要÷10^9后 才会和目标单位匹配
 * 因此：decimals为9(默认值)
*/
format.token.usdt(BigNumber(total.price).times(token.amount), { isAbbr: true })
```

```ts
// 代币值精度格式化
format.token.common(代币值(数量|价格...), {
    decimals?: 精度(默认9), 
    bignumDecimals?: 格式化后小数位数, 
    isAbbr?: 是否开启数字缩写,
    abbrOrigin?: 大于指定值后开始缩写
})

// eg. (分析略)
format.token.common(token.balance, { isAbbr: true, abbrOrigin: "M" }); 
format.token.common(BigNumber(token.amount).times(token.price), { bignumDecimals: 6 });
```



**其它格式化方法：**

```ts
// 见@/utils/format.ts，用法都是format.xxx
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

