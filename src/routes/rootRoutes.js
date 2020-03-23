import {
  asyncComponent as lazy
} from '@/components/helper/lazyLoader';

const Login = lazy(() => import('@/views/admin/login'));


export default {
  path: '',
  childRoutes: [{
    path: 'login',
    component: Login
  }]
}
