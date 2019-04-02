<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <nav-self v-if="pageList.includes($route.name)"></nav-self>
    </div>
</template>
<script>
import navSelf from "@/components/navSelf";
export default {
    name: "App",
    components: {
        navSelf
    },
    data() {
        return {
            pageList: ["home", "user", "servicePack"]
        };
    }
};
</script>

<style>
#app {
    height: 100%;
    margin: 0 auto;
    font-size: 0.36rem;
    max-width: 7.5rem;
    background-color: #fff;
}
</style>
