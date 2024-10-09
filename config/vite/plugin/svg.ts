import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export const setSvg = () => {
    return createSvgIconsPlugin({
        symbolId: 'icon-[name]',
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
    });
};
