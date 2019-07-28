import VueRouter from 'vue-router'


// 导入对应的路由组件
import HomeContainer from './components/tabbar/homeContainer.vue'
import MemberContainer from './components/tabbar/memberContainer.vue'
import ShopcarContainer from './components/tabbar/shopcarContainer.vue'
import SearchContainer from './components/tabbar/shearchContainer.vue'
import newList from './components/news/newsList.vue'
import newInfo from './components/news/newInfo.vue'
import phot0List from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsinfo from "./components/goods/goodinfo.vue"
import goodsText from "./components/goods/goodsText.vue"
import goodsComment from "./components/goods/goodsComment.vue"


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newList', component: newList },
    { path: '/home/newInfo/:id', component: newInfo },
    { path: '/home/photoList', component: phot0List },
    { path: '/home/photoinfo/:id', component: photoinfo },
    { path: '/home/goodsList', component: goodsList },
    { path: '/home/goodsinfo/:id',component: goodsinfo,  name:'goodsinfo'  },
    { path: '/home/goodsText/:id',component: goodsText,  name:'goodsText'  },
    { path: '/home/comment/:id',component: goodsComment,  name:'goodsComment'  },

  ],
  // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  linkActiveClass:'mui-active'
  
})

// 把路由对象暴露出去
export default router