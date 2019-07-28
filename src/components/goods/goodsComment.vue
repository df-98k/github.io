<template>
    <div>
        <goods :id="$route.params.id"></goods>
    </div>
</template>

<script>

import goods from "../subcomponents/comment.vue"
export default {
    components:{
        goods
    }
}
</script>

<style scoped>

</style>
