import { CacheKey } from '@/types/cacheKey';

interface CacheData {
    value: any;
    expire?: number;
}

export const localCache = {
    set(key: CacheKey, value: any, liveSeconds?: number): void {
        let data: CacheData = { value };
        if (liveSeconds) data.expire = new Date().getTime() + liveSeconds * 1000;
        localStorage.setItem(key, JSON.stringify(data));
    },
    get(key: CacheKey, defaultValue: any = null): any | null {
        const item = localStorage.getItem(key);
        if (item) {
            try {
                const data = JSON.parse(item);
                // 超时清空
                if (data.expire && data.expire < new Date().getTime()) {
                    localStorage.removeItem(key);
                    return null;
                }

                return data.value;
            } catch (error) {
                // 非法数据
                return null;
            }
        }
        // 无值时返回设定的默认值
        return defaultValue;
    },
    remove(key: CacheKey) {
        localStorage.removeItem(key);
    },
};
