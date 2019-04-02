<template>
    <div class="page_info" v-show="isPageShow">
        <div class="page">
            <div class="page_header">
            </div>
            <div class="img"><img :src="require('@/'+data.headImg)" alt=""></div>
            <div class="name">{{data.teamName}}</div>
            <div class="member clearfix" v-for="(item,index) in data.memberData" :key="index">
                <div class="left"><img :src="require('@/'+item.img)" alt=""></div>
                <div class="right">
                    <div class="member_name ">
                        {{item.name}}
                    </div>
                    <p class="content" v-for="(child,idx) in item.content" :key="idx">{{child}}</p>
                </div>
            </div>
            <div class="specialist">
                <img src="@/assets/team/specialist.jpg" alt="">
            </div>
            <div class="equity">
                <img :src="require('@/'+equityImg)" alt="">
            </div>

        </div>
        <div class="bot">
            <div class="left" @click="dialing">联系医生</div>
            <div class="right" v-if="userInfo.isBoundTeam == 0" @click="handleSign">签约家庭医生</div>
            <div class="right" v-else @click="handleTeam">更换家庭医生</div>
        </div>
    </div>
</template>

<script>
import member from "./tpl/member";
import { mapGetters } from "vuex";
import {
    teamSign,
    getOrderInfoById,
    teamChange,
    getTeamInfo
} from "@/api/user";
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            userInfo: {},
            teamData: {},
            isPageShow:false
        };
    },
    methods: {
        async dialing() {
            // 联系医生
            if (this.userInfo.isBoundTeam == 1) {
                let phone;
                this.teamData.staffs.some(item => {
                    if (item.mobile) {
                        phone = item.mobile;
                        return true;
                    }
                });
                if (phone) {
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
        // 更换医生
        async handleTeam() {
            if (this.userInfo.isChangedTeam == 1) {
                this.$message("已经更换过了，不能再次更换");
                return;
            }
            const status = this.$route.query.status; // 1 掉接口 0去医生列表
            if (status == 1) {
                const action = await MessageBox({
                    title: "提示",
                    message: "家庭医生只能更换一次,确定更换吗?",
                    showCancelButton: true
                });
                if (action == "confirm") {
                    const userId = this.$route.query.userId;
                    const data = {
                        orderId: this.orderId,
                        packId: this.equityId,
                        teamId: this.$route.params.id,
                        userId
                    };
                    this.$loading.open();
                    const res = await teamChange(data);
                    this.$loading.close();
                    if (res.STATUS === "1") {
                        this.$message("更换成功");
                        this.$router.push({
                            name: "packageInterest",
                            params: {
                                id: this.equityId
                            },
                            query: {
                                orderId: this.orderId,
                                userId
                            }
                        });
                    }
                }
            } else {
                this.$router.push({
                    name: "doctorTeam",
                    params: {
                        userId: this.$route.query.userId
                    },
                    query: {
                        status: 1
                    }
                });
            }
        },
        // 签约
        async handleSign() {
            const userId = this.$route.query.userId;
            const data = {
                orderId: this.orderId,
                packId: this.equityId,
                teamId: this.$route.params.id,
                userId
            };
            this.$loading.open();
            const res = await teamSign(data);
            this.$loading.close();
            if (res.STATUS === "1") {
                const name = this.data.memberData[0].name.split(" ")[0];
                this.$router.push({
                    name: "contractSuccess",
                    query: {
                        name,
                        userId
                    }
                });
            }
        },
        async getOrderInfoById() {
            const userId = this.$route.query.userId;
            this.$loading.open();
            const res = await getOrderInfoById(this.orderId, userId);
            this.$loading.close();
            if (res.STATUS === "1") {
                const userInfo = res.ITEMS.users.find(
                    item => item.id == userId
                );
                this.userInfo = userInfo;
            }
        },
        // 获取医生团队信息
        async getTeamInfo() {
            const id = this.$route.params.id;
            this.$loading.open();
            const res = await getTeamInfo(id);
            this.isPageShow = true
            this.$loading.close();
            if (res.STATUS === "1") {
                this.teamData = res.ITEMS;
            }
        }
    },
    computed: {
        ...mapGetters(["equityId", "openid", "orderId"]),
        equityImg() {
            let equityId = this.equityId;
            if (!equityId) {
                equityId = 1;
            }
            return `assets/equity/${equityId}.jpg`;
        }
    },
    created() {
        const id = this.$route.params.id;
        const data = member.find(item => item.id == id);
        this.data = data;
        this.getOrderInfoById();
        this.getTeamInfo();
    }
};
</script>

<style lang="less" scoped>
.page_info {
    .page {
        padding-bottom: 1rem;
        .page_header {
            height: 2.6rem;
            background: linear-gradient(
                180deg,
                rgba(81, 136, 166, 1) 0%,
                #fff 100%
            );
        }
        .img {
            margin-top: -1.5rem;
            padding: 0 0.5rem;
            img {
                border-radius: 4px;
            }
        }
        .name {
            font-size: 0.36rem;
            text-align: center;
            padding: 0.5rem 0;
        }
        .member {
            padding: 0.5rem 0.3rem;
            .left {
                width: 1.2rem;
                height: 1.2rem;
                float: left;
                border-radius: 50%;
                overflow: hidden;
            }
            .right {
                padding-left: 0.2rem;
                font-size: 0.36rem;
                overflow: hidden;
                .member_name {
                    margin-bottom: 0.2rem;
                    .phone {
                        font-size: 0.28rem;
                        color: #00c000;
                        img {
                            display: inline-block;
                            width: 0.6rem;
                            vertical-align: middle;
                        }
                    }
                }
                p {
                    font-size: 0.28rem;
                    color: #a3a3a3;
                    line-height: 0.36rem;
                }
            }
        }
    }
    .bot {
        position: fixed;
        top: auto;
        bottom: 0;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        width: 100%;
        max-width: 7.5rem;
        border-top: 1px solid #f7f7f7;
        .left,
        .right {
            text-align: center;
            width: 50%;
            color: #000;
            background-color: #fff;
        }
        .right {
            color: #fff;
            background-color: #ff7b72;
        }
    }
}
</style>

