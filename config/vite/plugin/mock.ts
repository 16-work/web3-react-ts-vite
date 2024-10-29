import { viteMockServe } from 'vite-plugin-mock';

export const setMock = () => {
    return viteMockServe({
        mockPath: 'mock',
    });
};
