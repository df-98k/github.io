<template>
	<div class="newsContent">
   <h4 class="title">{{ newsinfo.title }}</h4>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time |dateNew }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr />
<div class="content" v-html="newsinfo.content"></div>
   <!-- 评论子组件区域 -->

    <comment-box :id="this.id"></comment-box>


  </div>

</template>

<script>

import comment from '../subcomponents/comment.vue'

import Toast from 'mint-ui'

export default {

data() {
    return {
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {} // 新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // 获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(result => {
        console.log(result);
        
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components: {
    // 用来注册子组件的节点
    "comment-box": comment
  }


}
</script>

<style lang="scss" scoped>
.title{
  color: rgb(0, 89, 255)
}
.subtitle {
  font-size: 12px;
  color: red;
  display: flex;
  justify-content: space-between;
}
.content{
  font-size: 15px;
  color: black;
  img{
    width: 100%;
  }
};
.newsContent{
  padding: 0px 5px;
}

</style>