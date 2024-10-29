import { RouteObject } from 'react-router-dom';

const getModuleRoutes = (): RouteObject[] => {
    const modules = import.meta.glob('./*.routes.ts', { import: 'default', eager: true });
    let routes: RouteObject[] = [];
    Object.keys(modules).forEach((key) => {
        routes.push(modules[key] as RouteObject);
    });

    return routes;
};

export const moduleRoutes = getModuleRoutes();
