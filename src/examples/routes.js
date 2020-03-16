import Layout from '@/components/layout';
import ExamplePage from './index';
import CounterDemo from '@/components/counter-demo';

import FormBuilder from './formBuilder';

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
    },
    {
      path: 'form/:formId',
      name: "form Page",
      component: FormBuilder
    }
  ]
}
