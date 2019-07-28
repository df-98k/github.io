<template>
  <div class="mui-content">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunboItem"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsItem.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsItem.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsItem.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <number @getcount="getSelectedCount" :max="goodsItem.stock_quantity"></number>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
      <!-- <div class="mui-card-footer">页脚</div> -->
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsItem.goods_no }}</p>
          <p>库存情况：{{ goodsItem.stock_quantity }}件</p>
          <p>上架时间：{{ goodsItem.add_time | dateNew }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getgoodsMOre(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import number from "../subcomponents/goodsnumber.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunboItem: [], //轮播图数据
      goodsItem: {}, //获取商品信息
      ballFlag: false, // 控制小球的隐藏和显示的标识符
      selectedCount: 0 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getlunbo();
    this.getGoods();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          //   console.log(result);
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(element => {
            element.img = element.src;
          });

          this.lunboItem = result.body.message;
        }
      });
    },
    getGoods() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          //   console.log(result);
          this.goodsItem = result.body.message[0];
        }
      });
    },
    getgoodsMOre(id) {
      this.$router.push({ name: "goodsText", params: { id: id } });
    },
    getComment(id) {
      this.$router.push({ name: "goodsComment", params: { id: id } });
    },


    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 购物车数据添加显示模块
       let carinfo={
         id:this.id,
         count:this.selectedCount,
         price:this.goodsItem.sell_price,
         selected:true
       }
       this.$store.commit("addCart",carinfo)


    },
   
   

    // 购物车小球动画效果
    beforeEnter(el) {
      el.style.opacity = 1;
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      const ball = this.$refs.ball.getBoundingClientRect();
      const badge = document.querySelector("#badge").getBoundingClientRect();

      const x = badge.left - ball.left;
      const y = badge.top - ball.top;
      el.style.transform = `translate(${x}px, ${y}px)`//es6的模板字符串拼接
    //   el.style.transform ="translate(93px,230px)";
      el.style.transition = "all 1s ease-in";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
    }
  },
  components: {
    swiper,
    number
  }
};
</script>

<style scoped>
.mui-content {
  overflow: hidden;
}
.now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 10px 0;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 407px;
  left: 151px;
}
</style>

