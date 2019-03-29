<template>
    <div class="page">
        <div class="page_hearder">
            <div class="address"><span>北京</span><span class="iconfont icon-jiantou"></span></div>
        </div>
        <div class="banner">
            <img src="@/assets/images/home.jpg" alt="">
        </div>
        <div class="introduce">
            <div class="header">北京颐美佳中医院</div>
            <p class="content">颐美佳专科医生团队覆盖耳鼻咽喉科、眼科、口腔科、皮肤科、中医科，设备器械种类齐全。由解放军总医院、同仁医生集团、第四军医大学等专业团队组成，并有301医院、协和医院等若干三甲医院的知名专家常年坐诊。</p>
            <ul class="section">
                <li v-for="(item,index) in sectionList" :key="index">
                    <div class="title">{{item.title}}</div>
                    <p class="two-cut">{{item.content}}</p>
                    <img :src="require('@/'+item.img)" alt="">
                </li>
            </ul>
        </div>
        <h3>{{isHavePack? '我的服务包' : '服务包列表'}}</h3>
        <card-item :list="isHavePack?list:packList" @handleDetail="handleDetail"></card-item>
    </div>
</template>

<script>
import packList from "@/common/servicePack";
import CardItem from "@/components/CardItem/index";
import { mapGetters } from "vuex";
import { checkUser } from "@/api/user";
export default {
    components: {
        CardItem
    },
    data() {
        return {
            packList, //所有服务包
            list: [], //我的服务包
            sectionList: [
                {
                    title: "特色科室",
                    content: "耳鼻咽喉科、全科医疗科、眼科、口腔科",
                    img: "assets/home/unit.png"
                },
                {
                    title: "知名专家团队",
                    content: "若干三甲医院知名专家常年坐诊",
                    img: "assets/home/team.png"
                },
                {
                    title: "先进设备",
                    content: "顶级先进仪器设备 为您提供更精确的测",
                    img: "assets/home/facility.png"
                },
                {
                    title: "轻松就诊环境",
                    content: "高级就诊环境，置身其中舒适放松",
                    img: "assets/home/environment.png"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["bound", "orderList", "openid", "appid"]),
        isHavePack() {
            //true 展示我的服务包
            return this.list.length > 0;
        }
    },
    methods: {
        handleDetail({ id, orderId, userId }) {
            // 我的服务包
            if (orderId) {
                this.$router.push({
                    name: "packageInterest",
                    params: {
                        id
                    },
                    query: {
                        orderId,
                        userId
                    }
                });
            } else {
                this.$router.push({
                    name: "servicePackDetail",
                    params: {
                        id
                    }
                });
            }
        },
        // 获取我的服务包
        async getServiceInfo() {
            if (this.bound !== "1") {
                checkUser(this.openid, this.appid).then(res => {
                    if (res.ITEMS.bound === 1) {
                        this.$store.commit("SET_BOUND", res.ITEMS.bound);
                        this.renderInfo();
                    }
                });
            } else {
                this.renderInfo();
            }
        },
        async renderInfo() {
            let d;
            if (!this.orderList || this.orderList.length === 0) {
                const res = await this.$store.dispatch(
                    "setOrderList",
                    this.openid
                );
                d = res;
            } else {
                d = this.orderList;
            }
            const list = [];
            if (d && d.length > 0) {
                d.forEach(item => {
                    const current = this.packList.find(
                        pack => pack.id == item.packId
                    );
                    const user = item.users.map(child => child.name);
                    list.push({
                        ...current,
                        orderId: item.id,
                        userId: item.users[0].id,
                        name: user.join("/")
                    });
                });
                this.list = list;
            }
            if (this.familyList) {
                return;
            }
            this.$store.dispatch("setFamilyList", this.openid);
        }
    },
    created() {
        this.getServiceInfo();
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1rem;
    .page_hearder {
        padding: 0.4rem;
        .address {
            font-size: 0.4rem;
            font-weight: 500;
            color: #000;
            .icon-jiantou {
                font-size: 0.36rem;
            }
        }
    }
    .banner {
        height: 4rem;
        padding: 0 0.4rem;
        img {
            border-radius: 8px;
            height: 4rem;
        }
    }
    .introduce {
        padding: 0.4rem;
        .header {
            font-size: 0.4rem;
            font-weight: 500;
            color: #000;
            padding: 0.2rem 0;
        }
        .content {
            color: #8b8b8b;
            font-size: 0.28rem;
        }
        .section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 0.4rem 0;
            li {
                width: 48%;
                box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
                border-radius: 2px;
                padding: 0.3rem 0.8rem 0.3rem 0.1rem;
                position: relative;
                .title {
                    font-size: 0.32rem;
                    padding: 0.1rem 0;
                }
                p {
                    color: #8b8b8b;
                    font-size: 0.2rem;
                    line-height: 0.3rem;
                }
                img {
                    position: absolute;
                    height: .8rem;
                    width: .8rem;
                    right: 0;
                    top:.4rem;
                }
            }
        }
    }
    h3 {
        padding: 0.3rem;
        font-size: 0.4rem;
    }
}
</style>

