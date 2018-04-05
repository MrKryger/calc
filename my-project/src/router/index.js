import Vue from 'vue'
import Router from 'vue-router'
import Calc from '@/components/Calc'
import CalcTwo from '@/components/CalcTwo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calc',
      component: Calc
    },
    {
      path: '/calc',
      name: 'CalcTwo',
      component: CalcTwo
    }
  ]
})