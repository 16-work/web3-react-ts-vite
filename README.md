# README

**启动项目：**

```
pnpm i
```

```
pnpm build:packages
```

```
pnpm dev
```

**安装包：**

由于使用了Turbo的缘故，装包需要`-w`

```
pnpm add -w 包名
```



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
VITE_ENV = 'dev'
VITE_PORT = 8888
VITE_API_URL = 'http://dev-net.com/api'
```

```ts
declare interface MetaEnv {
    VITE_ENV: 'dev' | 'production' | 'mock';
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



#### 2.1 定义通用类型

**举例：**

```ts
// src/api/types.ts
export interface Paging {
    /** 页数 */
    page: number;
    /** 页长 */
    pageSize: number;
}
```



#### 2.2 定义模块api

**定义类型：**

```ts
// src/api/user/index.ts
import { Paging } from '../types';

export interface Item {
    id: number;
    name: string;
}

// Paging: { page: number; pageSize: number; }
export interface DTOGetList extends Paging {
    keyword?: string;
}
```

**编写接口：**

```ts
// src/api/user/index.ts
import { RDList } from '../types';
import { DTOGetList, Item } from './types';

export default {
    getList: (dto: DTOGetList) => {
        return http.post<RDList<Item>>('/list', { ...dto });
    },
};
```

**对外导出：**

```ts
// src/api/index.ts
import user from './user';

export const api = { user };
```

**调用：**

```ts
const res = await api.user.getList('tom');
// res: {
//     count: 1,
//     list: [{id:1, name: 'tom'},...]
// }
```



#### 2.3 编写虚拟数据

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
// mock/user.mock.ts
export default [
    mockAPI(
        'get',
        '/login',
        {
            token: 'Bearer xxxxxxxxx',
        },
        {
            status: 200,
            message: 'success',
        }
    ),
] as MockMethod[];
```

**切换到虚拟环境：**

```
pnpm mock
```

**使用：**

```ts
// src/api/user/index.ts
import { RDList } from '../types';
import { DTOGetList, Item } from './types';

export default {
    login: () => {
        return http.post<string>('/login', { ...dto });
    },
};
```



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
    detail: '/detail'  + '/:动态参数名' // 动态路由
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
<div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
    font-size: 8px;
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
// 版心
.w {
  @apply pc-min-w xs:w-full relative z-[1] mx-auto 
         md:max-w-??? xs:px-??? md:px-???;
}
// 顶部导航版心
.layout-nav-w {
  @apply w-full relative top-0 m-auto 
         max-w-??? xs:px-??? md:px-???;
}
```



**页面最小高度：**

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

> 推荐命名：`theme-[light/dark]-主题色.scss`



**编写主题内容：**

- 在`@/assets/theme/主题文件名.scss`设置相关变量

  > 示例见：`theme-light-blue.scss`和`theme-light-green.scss`

- 在`config/tailwindcss/color.ts`设置相关变量

  > 示例见`config/tailwindcss/color.ts`默认内容



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



### 5. 多语言

#### 5.1 基础使用

**生成多语言文件：**

- 编写xlsx表格，格式类似以下（encode列必须在第1列），替换`@/constants/i18n/script/i18n.xlsx`

  | encode | zh-CN | en   | ...  |
  | ------ | ----- | ---- | ---- |
  | 变量名 | 中文  | 英文 | ...  |

- 生成语言文件

  ```
  pnpm createi18n
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

**数据响应式：**

```ts
const state = ahooks.reactive({
  变量名: 值
});

// 可以直接赋值，不用像useState那样setValue
state.变量名 = 新值;
```

**异步请求：**

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

**带锁异步：**

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
// 支持的链
export const SUPPORT_CHAINS = [chains.链名1, chains.链名n];

// 默认链Id
export const DEFAULT_CHAIN_ID = chains.链名.id;

// 链图标
export const CHAINS_ICON: Record<number, string> = {
  // 记得加入图片@/assets/icon/链名.svg
  [chains.链名1.id]: '链名1',
  [chains.链名n.id]: '链名n',
};
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
      [ChainId.主网]: '主网合约地址',
      [ChainId.测试网]: '测试网网合约地址',
    },
  } as const satisfies Record<string, Record<number, `0x${string}`>>;
  ```



#### 3.2 使用合约Hook

**初始化合约Hook：**

往`@/hooks`目录下新增`use合约名.ts`

```ts
// @/hooks/use合约名.ts
import { ABI名 } from '@/constants/abi/合约名';
import { contracts } from '@/constants/contracts';

/** Hook */
export const use合约名 = () => {
  /** Params */
  const contractConfig = {
    address: contracts.合约名,
    abi: ABI名,
  };

  /** Actions */
  

  /** Return */
  return {  };
};
```

**编写合约方法：**

```ts
// @/hooks/use合约名.ts
export const use合约名 = () => {
  ...
  
  /** Actions */
  // 写合约 (stateMutability = 'nonpayable' | 'payable')
  const writeFunc = (value?: bigint) => {
    return hooks.contract.write({
      contractConfig,
      functionName: 'functionName', // 见合约方法的name
      args: [参数1值, 参数n值], // 见inputs
      value, // stateMutability: 'payable' 时需要传入该参数
    });
  };

  // 读合约 (stateMutability = 'view')
  const readFunc = async (args: any[]) => {
    const res = await hooks.contract.read({
      contractConfig,
      functionName: 'functionName', // 见合约方法的name
      args, // 见inputs
    });

    return res;
  };

  /** Return */
  return { writeFunc, readFunc };
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
    await 写合约方法名(task);
});
```

```ts
const 写合约方法名 = (task: Task, value?: bigint) => {
  return hooks.contract.write(task, {
    contractConfig,
    functionName: 'functionName',
    args: [],
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

```ts
--src
  --components
    --Animation // 动画组件
      --AnimationDrop.tsx // 下拉动画
      --AnimationNum.tsx // 数字滚动

    --Base // 基础组件
      --AntdProvider.tsx // Antd全局配置
      --Button.tsx // 按钮
      --Copy.tsx // 复制
      --Drawer.tsx // 抽屉
      --DropList.tsx // 下拉列表
      --Img.tsx // 图片
      --Loading.tsx // 加载中
      --Modal.tsx // 模态框
      --NoDate.tsx // 空数据
      --Scrollbar.tsx // 滚动条
      --Skeleton.tsx // 骨架屏

    --Box // 盒子
      --BoxCollapse.tsx // 可折叠盒子
      --BoxFill.tsx // 填充剩余高度盒子
      --BoxOreo.tsx // 上[中]下盒子

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

    --ScrollLoad // 滚动加载
      --ScrollLoadList.tsx // 无限滚动(所有数据)
      --BoxScrollLoad.tsx // 下滚翻页

    --Switch // 切换组件
      --CheckBox.tsx // 复选框
      --Radio.tsx // 单选框
      --Tabs.tsx // Tabs切换

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



### 2. 常用工具

**通知：**

```ts
// 可操作通知(显示于右上角)
toast.<类型>('信息');

// 普通通知(显示于正上方)
msg.<类型>('信息');
```

**本地存储：**

```ts
// @/types/cacheKey.ts
export type CacheKey = '键名' | ...;
```

```ts
localCache.get('键名'); // 取值
localCache.set('键名', 值) // 设值
```

**格式化：**

```ts
// 数字格式化(支持大数)
format.bignum(数值, 小数位)

// 其它见@/utils/format.ts，用法都是format.xxx
```

**小工具：**

```ts
// 复制
tools.copy('值');

// 其它见@/utils/tools.ts，用法都是tools.xxx
```

