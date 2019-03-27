<template>
  <div id="app">
    <router-view/>
    <nav-self v-if="pageList.includes($route.name)"></nav-self>
  </div>
</template>
<script>
import navSelf  from '@/components/navSelf';
export default {
  name: 'App',
  components:{
      navSelf
  },
  data() {
      return {
          pageList:['home','user','servicePack']
      }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:0 auto;
  font-size: .36rem;
  max-width: 7.5rem;
  width: 100%;
}
</style>
