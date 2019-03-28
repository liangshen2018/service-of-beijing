<template>
    <div class="page">
        <card-item :list="currentList"></card-item>
        <div class="member" v-if="formatFamily.length > 1">
            <div class="fl">当前成员:</div>
            <div class="fl">
                {{user.name}}
            </div>
            <div class="button fr" @click="popupVisible = true">更换成员</div>
        </div>
        <div class="privilege">
            <h3>你的特权</h3>
            <div class="privilege_info" @click="item.func?item.func(item):{}" v-for="(item,index) in privilegeData" :key="index">
                <div class="item clearfix">
                    <div class="title">{{item.title}}</div>
                    <span class="fl tip" v-if="item.tip">{{item.tip}}</span>
                    <span class="fr cancel"> {{item.status == 1 ? item.complte : item.cancel}}</span>
                </div>
            </div>
            <div class="privilege_info" v-for="equity in equityData" :key="equity">
                <div class="item clearfix">
                    <div class="title">{{equity}}</div>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <div class="content">
                <mt-radio align="right" v-model="user.id" :options="formatFamily">
                </mt-radio>
                <div class="empty" style="height:1rem"></div>
                <div class="btn" @click="handleConfirm">确认</div>
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
import  moment  from "moment";
export default {
    components: {
        CardItem
    },
    data() {
        return {
            currentList: [],
            privilegeData: [
                {
                    title: "专属家庭医生",
                    tip: "7*24小时守护宝贝的健康",
                    cancel: "未签约",
                    complte: "已签约",
                    prop: "isBoundTeam",
                    func: this.handleCancel
                },
                {
                    title: "健康自评",
                    tip: "填写你的基本信息",
                    cancel: "未填写",
                    prop: "isRecorded",
                    complte: "已填写",
                    func: this.handleAssessment
                },
                {
                    title: "专属健康档案",
                    tip: "私人定制您的健康档案",
                    cancel: "未建档",
                    complte: "已建档",
                    func: this.handleBabyDetail
                },
                {
                    title: "电话咨询",
                    tip: "快速接通医生电话，沟通及时",
                    cancel: "咨询",
                    complte: "咨询",
                    prop: "isBoundTeam",
                    func: this.handleCancel
                }
            ],
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
        // 签约/咨询
        handleCancel(item) {
            if (item.status == 0) {
                this.MessageBox();
            } else {
                this.$router.push({
                    name: "teamDetail",
                    params: {
                        id: this.user.docInfo.teamId
                    },
                    query: {
                        userId: this.user.id,
                    }
                });
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
        // 成员详情档案
        handleBabyDetail() {
            this.$router.push({
                name: "babyDetail",
                params:{
                    id: this.user.id
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
            if (item.status == 0) {
                this.$router.push({
                    name: "assessment",
                    params:{
                        userId:this.user.id,
                        doctorId:this.user.docInfo.relId
                    },
                });
            } else {
                this.$message('已填写完自评')
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
            this.$loading.open();
            const res = await getOrderInfoById(orderId, userId);
            this.$loading.close();
            if (res.STATUS === "1") {
                const d =  res.ITEMS
                const user = d.users.find(item => item.id == userId);
                user.id = `${user.id}`;
                this.user = user;
                this.currentList[0].name = this.user.name;
                this.currentList[0].endDate = d.endDate ? moment(d.endDate).format('YYYY-MM-DD') : ''
                this.privilegeData.forEach(item => {
                    Object.keys(user).forEach(key => {
                        if (item.prop === key) item.status = user[key];
                    });
                });
            }
        }
    },
    computed: {
        ...mapGetters(["equityId", "orderList"]),
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
        .button {
            color: #ff7b72;
        }
    }
    .privilege {
        padding: 0.3rem;
        h3 {
            line-height: 1rem;
        }
        .privilege_info {
            .item {
                padding: 0.3rem 0 0.3rem 0.3rem;
                border-bottom: 1px solid #ebebeb;
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
                display: inline-block;
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

