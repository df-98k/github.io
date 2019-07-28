<template>
  <div class="photoContainer">
    <!-- 头部区域 -->
    <h4>{{ photoinfo.title }}</h4>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time |dateNew }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 文章缩略图区域 -->

    <div class="thums-pic mui-clearfix ">
      <vue-preview :slides="list" >
        <!-- <img class="preview-img"> -->
      </vue-preview>
    </div>

    <!-- 图片内容区域 -->

    <div class="content" v-html="photoinfo.content"></div>

    <!--  导入 评论子组件区域 -->

    <compt :id="id"></compt>
  </div>
</template>


<script>
// 导入评论子组价 再在下面注册子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      //   记住这里自己发了个错，写成id=
      id: this.$route.params.id,
      photoinfo: [], //图片数组
      list: [], // 缩略图的数组
    
    };
  },
  created() {
    this.getInfolist();
    this.getPreview();
  },

  methods: {
    getInfolist() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        console.log(result);
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    // 缩略图引用
    getPreview() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      });
    },
    // handleClose () {
    //     console.log('close event')
    //   }

  },

  //    这里是注册评论的子组件
  components: {
    "compt": comment
  }
};
</script>

//style 里面的 scoped只会对页面起到块级作用域，对第三方插件没有效果，比如这里的 
// vue-preview 缩略图要改变大小时必须把 scoped 去掉

<style lang="scss">
.photoContainer {
  padding: 3px;
  h4 {
    color: #bb19bb;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

}

//    .my-gallery {
//         width: 100px;
//         height: 100px;
//         margin: 20px auto;
//     }

    // .thums-pic figure {
    //     float: left;
    //     width: 110px;
    //     margin: 0;
    //     margin-left: 10px;
    // }

    // .thums-pic figure img {
    //     width: 100%;
    // }

    .thums-pic img{
        width: 100px;
        height: 100px;
        float: left;
        margin: 2px;
        // box-shadow: 0 0 22px #ccc;
    }
</style>