import AdminLayout from "@/components/layout/admin";
import PageNotFound from "@/components/not-found";

import Login from './login';
import Home from './home';

export default {
  path: "admin",
  name: "home",
  component: AdminLayout,
  childRoutes: [{
      path: '',
      component: Home
    },
    {
      path: 'login',
      component: Login
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
}
