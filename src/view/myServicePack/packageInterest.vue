<template>
    <div class="page_info">
        <div class="page">
            <card-item :list="currentList"></card-item>
            <div class="member" v-if="formatFamily.length > 1">
                <div class="button fr" @click="popupVisible = true">更换成员</div>
            </div>
            <div class="privilege">
                <h3>
                    <span class="fl">你的特权</span>
                    <!-- <span class="fr button" @click="handleUser">个人中心</span> -->
                </h3>
                <div class="privilege_info" @click="item.func?item.func(item):{}" v-for="(item,index) in privilegeData" :key="index">
                    <div class="item clearfix">
                        <div class="title">{{item.title}}</div>
                        <span class="fl tip" v-if="item.tip">{{item.tip}}</span>
                        <span class="fr cancel" v-if="item.button"> {{item.status == 1 ?item.button.complete :item.button.text}}</span>
                    </div>
                </div>
            </div>

        </div>
        <mt-popup v-model="popupVisible" @touchmove.prevent position="bottom" style="width:100%">
            <div class="content">
                <mt-radio align="right" v-model="user.id" @change="handleConfirm" :options="formatFamily">
                </mt-radio>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import CardItem from "@/components/CardItem/index";
import list from "@/common/servicePack";
import equityList from "./tpl/list";
import { mapGetters } from "vuex";
import { getOrderInfoById } from "@/api/user";
import { MessageBox } from "mint-ui";
import moment from "moment";
export default {
    components: {
        CardItem
    },
    data() {
        return {
            currentList: [],
            privilegeData: [],
            formatFamily: [],
            user: {
                id: "",
                name: ""
            },
            popupVisible: false,
            equityList
        };
    },
    methods: {
        // 获取权益信息
        getEquityInfo() {
            const packId = this.$route.params.id;
            const orderId = this.$route.query.orderId;
            const userId = this.$route.query.userId;
            this.$store.commit("SET_ORDER_ID", orderId);
            this.$store.commit("SET_EQUITY_ID", packId);

            // 获取服务包卡片信息 静态
            const pack = list.find(item => item.id == packId);
            // 获取当前服务包权益信息
            const order = this.orderList.find(item => item.id == orderId);
            // 获取套餐成员
            const formatFamily = [];
            order.users.forEach((item, index) => {
                formatFamily.push({
                    value: `${item.id}`,
                    label: item.name
                });
            });
            // 获取当前成员信息
            this.getMemberInfo(userId);
            this.formatFamily = formatFamily;
            const currentList = [];
            currentList.push({ ...pack, name: "-" });
            this.currentList = currentList;
        },
        // 签约
        handleCancel(item) {
            if (item.status == 0) {
                this.$router.push({
                    name: "doctorTeam",
                    params: {
                        userId: this.user.id
                    }
                });
            } else {
                this.$router.push({
                    name: "teamDetail",
                    params: {
                        id: this.user.docInfo.teamId
                    },
                    query: {
                        userId: this.user.id
                    }
                });
            }
        },
        //咨询
        handleTeam(item) {
            if (this.user.isBoundTeam == 1) {
                // 联系医生
                const phone = this.user.docInfo.mobile;
                if (phone) {
                    // 联系医生
                    window.location.href = "tel:" + phone;
                } else {
                    // 联系客服
                    window.location.href = "tel:" + 18905316531;
                }
            } else {
                // 联系客服
                window.location.href = "tel:" + 18905316531;
            }
        },
        // 弹框
        MessageBox() {
            MessageBox({
                title: "提示",
                message: "您还未签约家庭医生,去签约?",
                showCancelButton: true
            }).then(action => {
                if (action == "confirm") {
                    this.$router.push({
                        name: "doctorTeam",
                        params: {
                            userId: this.user.id
                        }
                    });
                }
            });
        },
        // 填写自评
        handleAssessment(item) {
            this.user.isBoundTeam == 0;
            if (this.user.isBoundTeam == 0) {
                this.MessageBox();
                return;
            }
            if (this.user.isRecorded == 0) {
                this.$router.push({
                    name: "assessment",
                    params: {
                        userId: this.user.id,
                        doctorId: this.user.docInfo.relId
                    }
                });
            } else {
                this.$router.push({
                    name: "babyDetail",
                    params: {
                        id: this.user.id
                    }
                });
            }
        },
        // 选择成员确认
        handleConfirm() {
            this.popupVisible = false;
            const userId = this.user.id;
            this.getMemberInfo(userId);
        },
        async getMemberInfo(userId) {
            const orderId = this.$route.query.orderId;
            let equityId = this.equityId;
            // 服务包特权
            const current = this.equityList.find(item => item.id == equityId);
            this.privilegeData = current.equityData;
            this.$loading.open();
            const res = await getOrderInfoById(orderId, userId);
            this.$loading.close();
            if (res.STATUS === "1") {
                const d = res.ITEMS;
                const user = d.users.find(item => item.id == userId);
                user.id = `${user.id}`;
                this.user = user;
                this.currentList[0].name = this.user.name;
                this.currentList[0].endDate = d.endDate
                    ? moment(d.endDate).format("YYYY-MM-DD")
                    : "";
                this.privilegeData.forEach(item => {
                    if (item.prop === "isBoundTeam") {
                        item.func = this.handleCancel;
                    }
                    if (item.prop === "isRecorded") {
                        item.func = this.handleAssessment;
                    }
                    if (item.prop === "consult") {
                        item.func = this.handleTeam;
                    }
                    if (item.prop === "file") {
                        item.func = this.handleBabyDetail;
                    }
                    Object.keys(user).forEach(key => {
                        if (item.prop === key) item.status = user[key];
                    });
                });
            }
        },
        // 个人中心
        handleUser() {
            this.$router.push({
                name: "user",
                params: {
                    openid: this.openid,
                    appid: this.appid
                }
            });
        }
    },
    computed: {
        ...mapGetters(["equityId", "orderList", "openid", "appid"]),
        equityData() {
            let equityId = this.equityId;
            const current = this.equityList.find(item => item.id == equityId);
            return current.equityData;
        }
    },
    created() {
        this.getEquityInfo();
    }
};
</script>

<style lang="less" scoped>
.page {
    .member {
        padding: 0 0.3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        position: relative;
    }
    .button {
        font-size: 0.28rem;
        color: #ff7b72;
        line-height: 0.5rem;
    }
    .privilege {
        padding: 0.3rem;
        h3 {
            font-weight: 500;
            height: 1rem;
            line-height: 1rem;
        }

        .privilege_info {
            .item {
                padding: 0.3rem 1rem 0.3rem 0.3rem;
                border-bottom: 1px solid #ebebeb;
                position: relative;
            }
            .title {
                font-size: 0.32rem;
            }
            .tip {
                font-size: 0.28rem;
                color: #a9a9a9;
                height: 0.5rem;
                line-height: 0.5rem;
            }
            .cancel {
                font-size: 0.28rem;
                color: #fff;
                height: 0.5rem;
                width: 1.2rem;
                top: 0.5rem;
                right: 0.3rem;
                position: absolute;
                line-height: 0.5rem;
                text-align: center;
                font-size: 0.24rem;
                background: linear-gradient(
                    90deg,
                    rgba(255, 170, 151, 1) 0%,
                    rgba(255, 134, 160, 1) 100%
                );
                border-radius: 0.4rem;
                &.active {
                    background: #dbdbdb;
                }
            }
        }
    }
}
</style>

