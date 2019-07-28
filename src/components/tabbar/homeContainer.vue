<template>
  <div id="homebox">
    <!-- 轮播图区域 -->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeItem" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe> -->
  <swiper :lunbotuList ="swipeItem" >  </swiper>

    <!-- 九宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newList">
          <img src="../../images/menu1(1).png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// import VueResourse from 'vue-resource'

// Vue.use(VueResourse)

import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      swipeItem: []
    };
  },
  created() {
    this.getsWipe();
  },
  methods: {
    getsWipe() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          console.log(result.body);
          if (result.body.status === 0) {
            // 成功了
            this.swipeItem = result.body.message;
          } else {
            // 失败的
            Toast("加载轮播图失败。。。");
          }
        });
    },

  },
   components: {
    swiper
  }
};
</script>




<style lang="scss" scoped>
// .mint-swipe {
//   height: 200px;
// }
// .mint-swipe-item:nth-child(1) {
//   background-color: red;
// }
// img {
//   width: 100%;
//   height: 100%;
// }

// ul img{
//     width: 60px;
//     height: 60px;
// }
// body{
//   background-color: white !important;
// }

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
#homebox{
  background-color: #fff;
}


</style>