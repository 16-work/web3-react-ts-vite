import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export const build = {
  rollupOptions: {
    plugins: [rollupNodePolyFill()],
  },
};
