import homeRoutes from '@/views/web/routes';
import adminRoutes from "@/views/admin/routes";
import exampleRoutes from "@/examples/routes";
import PageNotFound from '@/components/not-found';
import rootRoutes from './rootRoutes';

const childRoutes = [
  adminRoutes,
  exampleRoutes,
  rootRoutes,
  homeRoutes,
];

// generator all the routes

const routes = [
  ...childRoutes.filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  {
    path: '*',
    name: "Page Not Found",
    component: PageNotFound
  }
];

/**
 * 过滤路由信息，路由信息中含有 isIndex 的在渲染
 *
 * @param {Object} route - 路由对象信息
 */
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) return;

  const indexRoute = route.childRoutes.find(r => r.isIndex);

  if (indexRoute) {
    const first = {
      ...indexRoute
    };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true;
    route.childRoutes.unshift(first);
  }

  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);

export default routes;
