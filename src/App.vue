<template>
  <div id="app">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title=" Vue项目" class="header"></mt-header>

    <!-- 中间的 路由 router-view 区域  主要是路由的内容-->
<transition mode='out-in' >
      <router-view>



      </router-view>
</transition>
  

    <!-- 底部 TabBar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item-llb ">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-email"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/shopcar" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-home mui-icon-extra-cart mui-icon-extra">
          <span class="mui-badge" id='badge'>{{ $store.getters.getAllCount }}</span>
        </span>

        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
     


  </div>
</template>

<script>


</script>


<style lang="scss" scoped>

 
	.v-enter, 
	.v-leave-to {
		opacity: 0;
	}
	.v-enter {
		transform: translateX(100%);
	}
	.v-leave-to {
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active {
		transition: all .4s ease;
	}

  
#app{
  padding-top: 40px;
  padding-bottom: 52px;
  	overflow-x: hidden;
}
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.header{
  z-index: 9999;
}

</style>
