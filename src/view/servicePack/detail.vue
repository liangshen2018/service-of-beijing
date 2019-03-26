<template>
    <div class="page">
        <template v-if="imgList.length > 0">
            <img :src="require('@/'+item.img)" alt="" v-for="(item,index) in imgList" :key="index">
        </template>
        <div class="purchase">
            <h2>购买须知</h2>
            <p>1:购买须知暂无内容</p>
        </div>
        <div class="btn" @click="hanleBuy">立即购买</div>
        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <div class="content">
                <h3>
                    <div class="tip">{{'单选'}}</div>
                    <span>选择家庭成员</span>
                    <div class="button" @click="handleBabyAdd">新增</div>
                </h3>
                <template v-if="formatFamily.length > 0">
                    <mt-radio align="right" v-model="babyId" :options="formatFamily">
                    </mt-radio>
                </template>
                <div v-else class="tip">暂无宝贝</div>
                <div class="empty" style="height:1rem"></div>
                <div class="btn" @click="handleConfirm">确认</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import list from "./tpl/img";
import { checkUser } from "@/api/user";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            list,
            imgList: [],
            popupVisible: false,
            babyId: "",
            value: [],
        };
    },
    computed: {
        ...mapGetters(["openid", "bound", "appid",'familyList']),
        formatFamily() {
            const data = []
            this.familyList.forEach(item => {
                  data.push({
                      value: `${item.id}`,
                      label: item.name
                  })
            })
            return data
        }
    },
    methods: {
        // 点击立即购买
        hanleBuy() {
            const openid = this.openid;
            const appid = this.appid;
            const bound = this.bound;
            if (bound != 1) {
                checkUser(openid, appid).then(res => {
                    if (res.ITEMS.bound === 1) {
                        this.$store.commit("SET_BOUND", res.ITEMS.bound);
                        this.getFamilyList();
                    } else {
                        this.$router.push(
                            `/login?redirect=${this.$route.path}`
                        );
                    }
                });
            } else {
                this.getFamilyList();
            }
        },
        //  获取详情
        getDetailInfo() {
            const id = this.$route.params.id;
            const current = this.list.find(item => item.id == id);
            this.imgList = current.imgList;
        },
        // 获取家庭成员
        async getFamilyList() {
            if(this.familyList) {
                this.popupVisible = true;
                return
            }
            await this.$store.dispatch('setFamilyList',this.openid)
            this.popupVisible = true;
        },
        // 新增
        handleBabyAdd() {
            this.$router.push({
                name: "babyAdd",
                query: {
                    redirect: this.$route.path
                }
            });
        },
        // 确认
        handleConfirm() {
            if (!this.babyId) {
                this.$message({
                    message: "请选择家庭成员",
                    position: "bottom"
                });
                return;
            }
            const userIds = this.babyId
            this.$router.push({
                name: "payment",
                params: {
                    packageId: this.$route.params.id,

                },
                query:{
                    userIds,
                }
            });
        }
    },
    mounted() {
        this.getDetailInfo();
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1rem;
    .purchase {
        h2 {
            font-size: 0.4rem;
            padding-left: 0.4rem;
            margin-top: 1rem;
        }
        p {
            font-size: 0.3rem;
            color: #757575;
            padding-left: 0.4rem;
            margin: 0.4rem 0 1rem 0;
        }
    }
    .position {
        position: fixed;
        bottom: 0;
    }
    .content {
        font-size: 0.32rem;
        h3 {
            text-align: center;
            height: 1rem;
            line-height: 1rem;
            border-bottom: 1px solid #f6f6f6;
            position: relative;
            padding: 0 0.5rem;
            .tip {
                position: absolute;
                font-size: 0.3rem;
                color: #757575;
                height: 1rem;
                line-height: 1rem;
                width: 2rem;
                top: 0;
                left: 0;
            }
            .button {
                font-size: 0.3rem;
                color: #ff7b72;
                position: absolute;
                height: 1rem;
                line-height: 1rem;
                width: 2rem;
                right: 0;
                top: 0;
            }
        }
        li {
            padding: 0.2rem 0.2rem 0.2rem 0.4rem;
        }
        .age {
            color: #757575;
            font-size: 0.24rem;
            margin-top: 0.1rem;
        }
        .tip {
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            color: #757575;
        }
    }
}
</style>

