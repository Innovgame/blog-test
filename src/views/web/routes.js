import React, {
  Component
} from 'react';
import WebLayout from '@/components/layout/web';
import PageNotFound from '@/components/not-found';

import Home from './home';
import Demo from './header/authModal';

export default {
  path: '/',
  name: "home",
  component: WebLayout,
  childRoutes: [{
      path: '',
      component: Home
    },
    {
      path: 'demo',
      component: () => <Demo type="demo" visible={true} handleClose={() => console.info("close")}/>
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
}
