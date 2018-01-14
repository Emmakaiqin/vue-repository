// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import LayOut from './components/LayOut.vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './components/pages/Index.vue'
import DetailPage from './components/pages/Detail.vue'
import Publish from './components/pages/detail/Publish.vue'
import Analysis from './components/pages/detail/Analysis.vue'
import Forecast from './components/pages/detail/Forecast.vue'
import Count from './components/pages/detail/Count.vue'
import OrderListPage from './components/pages/OrderList.vue'

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Router);
let router = new Router({
  mode:"history",
  routes: [
    {
      path:'/',
      component:IndexPage
    },
    {
      path:'/orderList',
      component:OrderListPage
    },
    {
      path:'/detail',
      component:DetailPage,
      redirect:'/detail/analysis',
      children:[//子路由
        {
          path:'analysis',
          component:Analysis
        },
        {
          path:'count',
          component:Count
        },
        {
          path:'forecast',
          component:Forecast
        },
        {
          path:'publish',//不用前面加’/‘
          component:Publish
        }
      ]
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<LayOut/>',
  components: { LayOut }
});
