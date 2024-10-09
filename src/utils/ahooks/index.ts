import * as hooks from 'ahooks';
import { newUseRequest } from './useRequest';
import { newUseLockFn } from './useLockFn';

// 默认方法类型
type Ahooks = {
    [key in keyof typeof hooks as key extends `use${infer U}` ? Uncapitalize<U> : never]: key extends 'useRequest'
        ? typeof newUseRequest
        : key extends 'useLockFn'
        ? typeof newUseLockFn
        : (typeof hooks)[key];
};

/* 默认方法名去掉 "use"，并将剩余字符串的首字母改成小写 */
const ahooks = {} as Ahooks;
for (const key in hooks) {
    const methodName = key.charAt(3).toLowerCase() + key.slice(4);
    // @ts-ignore
    ahooks[methodName] = hooks[key as keyof typeof hooks];
}

/* 覆盖原有方法 */
ahooks.request = newUseRequest;
ahooks.lockFn = newUseLockFn;

// 导出
export { ahooks };
