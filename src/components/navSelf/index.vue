<template>
    <div class="nav clearfix">
        <div class="nav_item" @click="item.func()" :class="{'active': item.routeName === $route.name}" v-for="(item,index) in navData" :key="index">
            <i class="iconfont" :class="item.icon"></i>
            <p>{{item.title}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            navData: [
                {
                    title: "首页",
                    icon: "icon-shouye",
                    func: this.handleHome,
                    routeName: "home"
                },
                {
                    title: "服务包",
                    icon: "icon-shangcheng1",
                    func: this.handleServicePack,
                    routeName: "servicePack"
                },
                {
                    title: "个人",
                    icon: "icon-geren",
                    func: this.handleUser,
                    routeName: "user"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['openid','appid'])
    },
    methods: {
        handleHome() {
            this.$router.push({
                name: "home",
                params: {
                    openid: this.openid,
                    appid: this.appid
                }
            });
        },
        handleUser() {
            this.$router.push({
                name: "user",
                params: {
                    openid: this.openid,
                    appid: this.appid
                }
            });
        },
        handleServicePack() {
            this.$router.push({
                name: "servicePack",
                params: {
                    openid: this.openid,
                    appid: this.appid
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.nav {
    position: fixed;
    bottom: 0;
    top:auto;
    width: 100%;
    max-width: 7.5rem;
    height: 1rem;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    .nav_item {
        float: left;
        text-align: center;
        width: 33.3%;
        font-size: 0.24rem;
        color: #7b7b7b;
        &.active {
            color: #ffa19a;
        }
        i {
            font-size: 0.5rem;
        }
        p {
            padding-top: 0.1rem;
        }
    }
}
</style>

