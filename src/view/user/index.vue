<template>
    <div class="page">
        <div class="user_header">
            <div class="user_info">
                <div class="img"><img :src="recordList.headImg" alt=""></div>
                <span>{{recordList.name}}</span>
                <span class="button" @click="handleEdit"></span>
            </div>
        </div>
        <!-- <div class="meun clearfix">
            <div class="meun_item" @click="handleMyPack">
                <img src="@/assets/images/board.png" alt="">
                <p>服务包订单</p>
            </div>
        </div> -->
        <div class="service_pack" @click="handleMyPack">
            <span>服务包订单</span>
        </div>
        <div class="meun">
            <h3>家庭成员</h3>
            <div class="swiper">
                <mt-swipe :auto="4000">
                    <mt-swipe-item @click.native="handleBabyDatail(item)" v-for="(item,index) in familyList" :key="index">
                        <div class="content">
                            <div class="name">{{item.name}}</div>
                            <div class="birthday">{{getBabyAge(item.birthday)}}</div>
                            <ul class="menu">
                                <li>
                                    <div>0</div>
                                    <p>健康评估</p>
                                </li>
                                <li>
                                    <div>0</div>
                                    <p>随访管理</p>
                                </li>
                                <li>
                                    <div>0</div>
                                    <p>健康体检</p>
                                </li>
                                <li>
                                    <div>0</div>
                                    <p>就诊记录</p>
                                </li>

                            </ul>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="content">
                            <div class="button"><span @click="handleAddBaby">新增家庭成员</span></div>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <!-- <div class="meun clearfix">
            <h3>常用工具</h3>
            <div class="meun_item" @click="item.func" v-for="(item,index) in meunList" :key="index">
                <img class="img" :src="require('@/'+item.img)" alt="">
                <p>{{item.content}}</p>
            </div>
        </div> -->

    </div>
</template>

<script>
import checkUser from "./mixin.js";
import { getUserInfo, getFamilyList } from "@/api/user";
import { mapGetters } from "vuex";
import { formatSex, getBabyAge } from "@/utils";
export default {
    data() {
        return {
            recordList: {},
            meunList: [
                {
                    content: "我的消息",
                    img: "assets/images/message.png",
                    func: this.handleConsultDr
                },
                {
                    content: "帮助中心",
                    img: "assets/images/icon_help.png",
                    func: this.handleHelp
                },
                {
                    content: "投诉建议",
                    img: "assets/images/complaint.png",
                    func: this.handleHelp
                }
            ]
        };
    },
    methods: {
        // 获取用户信息
        getBabyAge,
        async getUserInfo() {
            if (this.userInfo) {
                const d = this.userInfo;
                this.recordList = {
                    name: d.name,
                    headImg: d.headImg
                };
                return;
            }
            this.$store.dispatch("setUserInfo", this.openid).then(d => {
                this.recordList = {
                    name: d.name,
                    headImg: d.headImg
                };
            });
        },
        // 获取家庭成员
        async getFamilyList() {
            if (this.familyList) {
                return;
            }
            this.$store.dispatch("setFamilyList", this.openid);
        },
        handleMyPack() {
            this.$router.push({
                name: "myServicePack"
            });
        },
        handleEdit() {
            this.$router.push({
                name: "userEdit"
            });
        },
        handleBabyDatail(item) {
            this.$router.push({
                name: "babyDetail",
                params: {
                    id: item.id
                }
            });
        },
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
        handleHelp() {}
    },
    mixins: [checkUser],
    computed: {
        ...mapGetters(["openid", "userInfo", "familyList"])
    },
    created() {
        this.getUserInfo();
        this.getFamilyList();
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1rem;
    .user_header {
        padding: 1rem 0.3rem 0 0.3rem;
        background: url("../../assets/images/user_h.png") no-repeat;
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
                overflow: hidden;
            }
            .button {
                width: 0.32rem;
                height: 0.32rem;
                display: inline-block;
                background: url("../../assets/images/edit.png") no-repeat;
                background-size: cover;
                margin-left: 0.3rem;
            }
        }
    }
    .meun {
        margin: 0.7rem 0;
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
                color: #7b7b7b;
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
                background: url("../../assets/images/swipe.png") no-repeat;
                background-position-y: bottom;
                background-color: #fff;
                background-size: 100% 0.5rem;
                box-shadow: 0px 13px 20px 0px rgba(255, 255, 255, 0.31);
                border-radius: 4px;
                border: 1px solid rgba(243, 243, 243, 1);
                .name {
                    height: 0.8rem;
                    line-height: 0.8rem;
                    text-align: center;
                }
                .birthday {
                    text-align: center;
                    font-size: 0.28rem;
                    color: #8c8c8c;
                }
                .menu {
                    padding-top: 0.5rem;
                    display: flex;
                    li {
                        width: 25%;
                        text-align: center;
                        p {
                            color: #8B8B8B;
                            font-size: .28rem;
                            padding: .1rem 0;
                        }
                    }
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
    .nav {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1rem;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
        background-color: #fff;
        .nav_item {
            float: left;
            text-align: center;
            width: 33.3%;
            font-size: 0.24rem;
            color: #7b7b7b;
            i {
                font-size: 0.5rem;
            }
            p {
                padding-top: 0.1rem;
            }
        }
    }
    .service_pack {
        height: 2.26rem;
        width: 90%;
        margin: 0.4rem auto 0;
        border-radius: 6px;
        padding-left: 0.4rem;
        color: #fff;
        font-size: 0.4rem;
        line-height: 2.26rem;
        background: url("~@/assets/team/package.jpg") center no-repeat;
        background-size: 100% 2.26rem;
    }
}
</style>

