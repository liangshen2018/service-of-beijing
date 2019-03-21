<template>
    <div class="page">
        <div class="user_header">
            <div class="user_info">
                <div class="img"><img src="" alt=""></div>
                <span>凉凉</span>
                <span class="button" @click="handleEdit"></span>
            </div>
        </div>
        <div class="meun clearfix">
            <div class="meun_item" @click="handleMyPack">
                <img src="@/assets/images/board.png" alt="">
                <p>服务包订单</p>
            </div>
        </div>
        <div class="meun">
            <h3>宝贝档案</h3>
            <div class="swiper">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="(item,index) in recordList" :key="index">
                        <div class="content">
                            <div class="name">{{item.name}}</div>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="content">
                            <div class="button"><span @click="handleAddBaby">新增宝贝档案</span></div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div class="meun clearfix">
            <h3>常用工具</h3>
            <div class="meun_item" @click="item.func" v-for="(item,index) in meunList" :key="index">
                <img class="img" :src="require('@/'+item.img)" alt="">
                <p>{{item.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recordList: [{ name: "张三" }],
            meunList: [
                { content: "家庭医生", img: "assets/images/icon_doctor.png", func: this.handleConsultDr },
                { content: "帮助反馈", img: "assets/images/icon_help.png",func: this.handleHelp }
            ]
        };
    },
    methods: {
        handleMyPack() {
            this.$router.push({
                name: "myServicePack"
            });
        },
        handleEdit() {},
        handleAddBaby() {
            this.$router.push({
                name: "babyAdd"
            });
        },
        handleConsultDr() {
            this.$router.push({
                name: "consultDr"
            });
        },
        handleHelp() {

        }
    }
};
</script>

<style lang="less" scoped>
.page {
    .user_header {
        padding: 1rem 0.3rem 0 0.3rem;
        background: url("~@/assets/images/user_h.png") no-repeat;
        background-size: 100% 2rem;
        .user_info {
            height: 2rem;
            background-color: #fff;
            box-shadow: 0px 4px 17px -3px rgba(248, 151, 164, 0.13);
            border-radius: 4px;
            padding: 0.3rem 0 0 0.3rem;
            .img {
                width: 1.2rem;
                height: 1.2rem;
                display: inline-block;
                vertical-align: middle;
                border-radius: 50%;
                //  background-color: rgb(157, 255, 0);
            }
            .button {
                width: 0.32rem;
                height: 0.32rem;
                display: inline-block;
                background: url("~@/assets/images/edit.png") no-repeat;
                margin-left: 0.3rem;
            }
        }
    }
    .meun {
        margin: 1rem 0;
        padding: 0 0.3rem;
        h3 {
            font-size: 0.36rem;
            padding-left: 0.3rem;
            margin-bottom: 0.3rem;
        }
        .meun_item {
            float: left;
            width: 25%;
            img {
                width: 0.8rem;
                height: 0.8rem;
                margin: 0 auto;
            }
            .img {
                width: 0.4rem;
                height: 0.4rem;
                margin: 0 auto;
            }
            p {
                color: rgba(3, 3, 3, 1);
                font-size: 0.24rem;
                text-align: center;
                margin-top: 0.2rem;
            }
        }
        .swiper {
            height: 3rem;

            .content {
                height: 100%;
                width: 95%;
                margin: 0 auto;
                background: url("~@/assets/images/swipe.png") no-repeat;
                background-position-y: bottom;
                background-color: #fff;
                box-shadow: 0px 13px 20px 0px rgba(255, 255, 255, 0.31);
                border-radius: 4px;
                border: 1px solid rgba(243, 243, 243, 1);
                .name {
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                }
                .button {
                    margin-top: 1rem;
                    text-align: center;
                    span {
                        padding: 0.2rem 0.4rem;
                        border: 1px solid #ff7b72;
                        color: #ff7b72;
                        border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
                    }
                }
            }
        }
    }
    .mint-swipe {
        overflow: visible;

        /deep/ .mint-swipe-indicators {
            bottom: -0.5rem;
            .mint-swipe-indicator {
                background-color: #000;
            }
            .mint-swipe-indicator.is-active {
                background-color: red;
            }
        }
    }
}
</style>

