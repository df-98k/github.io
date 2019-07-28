<template>
  <div>
    <!-- 顶部滑块 -->
   <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap='getImglist(item.id)' >
            {{ item.title }}
          </a>
        </div>
      </div>

    </div>
  
   <!-- 图片列表区域 -->  


       <!-- <ul class="photo-list">
         <li v-for="item in imgList " :key="item.id">
           <img :src=" item.img_url " alt="">

         </li>
    
       </ul>  -->

<ul class="photo-list">
      <router-link class="lis" v-for="item in imgList" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>



  </div>
</template>

<script>
// 导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      imgList:[]
    };
  },

  mounted() {
    // 顶部滚动条
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllitem();
    this.getImglist(0)
  },
  methods: {
    getAllitem() {
      this.$http.get("api/getimgcategory").then(result => {
        // console.log(result);

        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部的", id: 0 });

           this.cates = result.body.message;
        }
      });
    },

    // 获取图文列表
    getImglist(cateId){
       this.$http.get('api/getimages/'+cateId).then(result=>{
        //  console.log(result);
         
         if(result.body.status===0){
           this.imgList=result.body.message;
         }
       })

    }

  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
 .lis {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        color: deeppink;
        font-size: 15px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }


</style>