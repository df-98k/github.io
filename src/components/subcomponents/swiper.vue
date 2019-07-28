<template>
    <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
        
    </div>
</template>
<script>
export default {

    // 这里一直报错 是因为后面加了个空格，一定的注意
    props:["lunbotuList"]
    
}
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item:nth-child(1) {
  background-color: red;
}
img {
  width: 100%;
  height: 100%;
}
</style>
