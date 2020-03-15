import Layout from '@/components/layout';
import ExamplePage from './index';
import CounterDemo from '@/components/counter-demo';


export default {
  path: 'examples',
  component: Layout,
  childRoutes: [{
      path: '',
      component: ExamplePage,
      name: "Example Page"
    },
    {
      path: 'count',
      component: CounterDemo,
      name: "Count Page"
    }
  ]
}
