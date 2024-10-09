export interface Paging {
    /** 页数 */
    page: number;
    /** 页长 */
    pageSize: number;
}

export interface RDList<T> {
    /** 页数 */
    count: number;
    /** 页长 */
    list: T[];
}
