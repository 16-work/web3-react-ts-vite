export const setServer = (env: MetaEnv) => {
    return {
        port: env.VITE_PORT,
        host: env.VITE_HOST,
        open: true,
    };
};
