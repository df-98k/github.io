<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h5>
                {{item.title}}
            </h5>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time |dateNew}} </span>
              <span>点击： {{item.click}} 次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import {Toast} from 'mint-ui'

export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getnewsList();
  },
  methods: {
    getnewsList() {
      this.$http.get("api/getnewslist").then(result => {
        console.log(result);
         if(result.body.status===0){
             this.newsList=result.body.message;
         }else{
             Toast('获取数据失败')
         }

      });
    }
  }
};
</script>




<style lang="scss" scoped>
.mui-table-view {
  li {
    .mui-ellipsis {
      font-size: 12px;
      color: deeppink;
      display: flex;
      justify-content: space-between;
    }
    h5{
     font-weight: 700

    }
  }
}
</style>