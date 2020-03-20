import AdminLayout from "@/components/layout/admin";
import PageNotFound from "@/components/not-found";

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
      path: '*',
      component: PageNotFound
    }
  ]
}
