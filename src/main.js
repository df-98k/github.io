// 入口文件
import Vue from 'vue'


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'


// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)



// 导入缩略图

import VuePreview from 'vue-preview'

Vue.use(VuePreview)



// 下载时间插件 coment 
// 定义全局过滤器
import moment from 'moment'
Vue.filter('dateNew', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {

  return moment(dataStr).format(pattern)

})


// 设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005";


// 导入 mui 的样式文件
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// 需要什么组件就在{input}里面加,用bootrapt就不需要这么写
import {
  Header,
  Swipe,
  SwipeItem,
  Button,
  Lazyload,
  Switch

} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);




// 引入并且注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
// 注意 这里的Store一定要大写
var store = new Vuex.Store({
  state: {
    car:car
  },

  mutations: {
    addCart(state, carinfo) {
      let flag = false
      state.car.some(item => {
        if (item.id == carinfo.id) {
          item.count += parseInt(carinfo.count)
          flag = true
          return true
        }
      });
      if(!flag) state.car.push(carinfo)
      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中

      localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters:{
    getAllCount(state){
      let c=0;
      state.car.forEach(element => {
        c+=element.count
      });
      return c

    }
  }

})


// 导入 App 根组件
import app from './App.vue'

let vm = new Vue({
  el: "#app",
  render: c => c(app),
  router,
  store
})