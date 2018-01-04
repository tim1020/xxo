import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import userDao from './dao/user'
import config from './config'
import utils from './utils'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/index",
    },
    {
      path: '/index', 
      name: 'index',
      component: (resolve) => require(['@/views/index.vue'], resolve)  //webpack会按需加载
    },
    {
      path: '/auth',//认证页
      name: 'auth',
      component: (resolve) => require(['@/views/auth.vue'], resolve),
    },
    {
      path: '/about', //关于
      name: 'about',
      component: (resolve) => require(['@/views/about.vue'], resolve),
    },
    {
      path: '/help', //帮助
      name: 'help',
      component: (resolve) => require(['@/views/help.vue'], resolve),
    },
    {
      path: '/profile', 
      name: 'profile',
      component: (resolve) => require(['@/views/profile.vue'], resolve),
    },
    {
      path: '/game_list', 
      name: 'game_list',
      component: (resolve) => require(['@/views/game_list.vue'], resolve),
    },
    {
      path: '/game', 
      name: 'game',
      component: (resolve) => require(['@/views/game.vue'], resolve),
    },
    {
      path: '/rank', 
      name: 'rank',
      component: (resolve) => require(['@/views/rank.vue'], resolve),
    },
    {
      path:"*",
      redirect:"/"
    }
  ]
})

router.beforeEach((to, from, next) => {
  let state = store.state;
  utils.dlog(to)
  utils.dlog(state)
  if(to.name=='game_list' && state.game.gid){
    next('/game')
    return
  }
  if(from.name == 'game'){
    store.commit('set_game_mode',0)
  }
  if(to.name != 'auth'){ //auth页不处理
    if(!localStorage.getItem(config.LS_TOKEN) || !localStorage.getItem(config.LS_UID)){
      store.commit('set_path',to.path)
      next('/auth')
      return
    }
  }
  next()
})

router.afterEach(page=>{
})

export default router