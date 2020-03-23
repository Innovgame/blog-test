import {
  lazy
} from 'react';

import AdminLayout from "@/components/admin/layout";
import PageNotFound from "@/components/not-found";

import Home from './home';

const Edit = lazy(() => import('./edit'));
const Login = lazy(() => import('./login'));

export default {
  path: "admin",
  name: "home",
  component: AdminLayout,
  childRoutes: [{
      path: '',
      component: Home,
      icon: 'home',
      name: '首页'
    },
    {
      path: 'articles',
      icon: 'file',
      name: '文章管理',
      childRoutes: [{
          path: 'edit',
          icon: 'edit',
          name: '新增文章',
          component: Edit
        },
        {
          path: 'manager',
          icon: 'folder',
          name: '管理文章',
          component: Home
        }
      ]
    },
    {
      path: 'login',
      component: Login,
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
}
