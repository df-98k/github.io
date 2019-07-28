<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 开关按钮 -->
           <mt-switch></mt-switch>

            <img :src="item.thumb_path" alt />

            <div class="info">
              <h3>{{item.title}}  </h3>
              <p>
                <span>￥{{item.sell_price}} </span>
                <number></number>
                <a href="#">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  


    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>

<script>
import number from "../subcomponents/shopcarnumber.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getgoodsList();
  },
  methods: {
    getgoodsList() {
      // 先根据ID判断购物车里面是否有这个商品
      // 所以建个空数组，存放每组的ID
      var IDarr = [];
      this.$store.state.car.forEach(element => {
        IDarr.push(element.id);
        if (IDarr.length <= 0) {
          return;
        }
      });

      this.$http
        .get("api/goods/getshopcarlist/" + IDarr.join(","))
        .then(result => {
          console.log(result);
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    }
  },
  components: {
    number
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container{
	 background-color: #eee;
  overflow: hidden;
};
.mui-card-content-inner img {

  width: 50px;
};
h3 {
	color: rgb(75, 78, 99);
  font-size: 13px;
};
span {
  color: red;
};
.mui-card-content-inner {
  display: flex;
  align-items: center;

};

</style>