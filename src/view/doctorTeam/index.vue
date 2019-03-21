<template>
    <div class="page">
       <team-self :list="list" @handleCancel="handleCancel"></team-self>
    </div>
</template>

<script>
import teamSelf from './components/teamSelf'
export default {
   components: {
       teamSelf
   },
   data() {
       return {
           list: [{},{}]
       }
   },
   methods: {
       handleCancel(item) {
           this.$router.push({
               name:'contractFamilyphysic',
               params:{
                   id:1
               }
           })
       }
   }
}
</script>

<style lang="less" scoped>

</style>

