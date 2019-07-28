<template>
    <div class="container">
        <h3>  {{goodsmore.title}} </h3>
        <hr>
        <div class="content" v-html="goodsmore.content" >
            <!-- {{goodsmore.content}} -->
        </div>
         
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsmore:{}
        }
    },
    created(){
       this.getgoodsMore()
    },
    methods:{
        getgoodsMore(){
            this.$http.get("api/goods/getdesc/"+this.id).then(result=>{
                if(result.body.status===0){
                    console.log(result);
                    if(result.body.message){
                        this.goodsmore=result.body.message[0];
                    }
                    
                }
            })
        }
    }
}
</script>

<style >
  .container{
      padding: 4px;
  }
    h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
 .content img{
      width: 100%;
      /* height: 300px; */
     
  }

</style>
