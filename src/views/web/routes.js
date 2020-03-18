import React, {
  Component
} from 'react';
import WebLayout from '@/components/layout/web';
import PageNotFound from '@/components/not-found';

import Home from './home';

export default {
  path: '/',
  name: "home",
  component: WebLayout,
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
