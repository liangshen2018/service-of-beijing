<template>
    <div class="page">
        <service-pack-item :list="currentList" @handleDetail="handleDetail"></service-pack-item>
        <div class="privilege">
            <h3>你的特权</h3>
            <div class="privilege_info" @click="item.func?item.func():{}" v-for="(item,index) in privilegeData" :key="index">
                <div class="item clearfix">
                    <div class="title">{{item.title}}</div>
                    <span class="fl tip">{{item.tip}}</span>
                    <span class="fr cancel"> {{item.cancel}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import servicePackItem from "@/components/servicePackItem/index";
import list from "@/common/servicePack";
export default {
    components: {
        servicePackItem
    },
    data() {
        return {
            currentList: [],
            privilegeData: [
                {
                    title: "健康自评",
                    tip: "填写你的基本信息",
                    cancel: "未自评",
                    func: this.handleAssessment
                },
                {
                    title: "健康管理",
                    tip: "私人定制您的健康档案",
                    cancel: "未建档",
                    func: this.handleBabyDetail
                },
                {
                    title: "健康咨询",
                    tip: "快速接通医生电话，沟通及时",
                    cancel: "咨询",
                    func: this.handleConsultDr
                }
            ]
        };
    },
    methods: {
        handleCancel() {
            this.$router.push({
                name: "doctorTeam"
            });
        },
        handleDetail() {},
        handleBabyDetail() {
            this.$router.push({
                name: "babyDetail"
            });
        },
        handleConsultDr() {
            this.$router.push({
                name: "consultDr"
            });
        },
        handleAssessment() {
            this.$router.push({
                name: "assessment"
            });
        }
    },
    created() {
        const id = this.$route.params.id;
        const currentList = [];
        currentList.push(list.find(item => item.id == id));
        this.currentList = currentList;
    }
};
</script>

<style lang="less" scoped>
.page {
    .privilege {
        padding: 0.3rem;
        h3 {
            line-height: 1rem;
        }
        .privilege_info {
            .item {
                padding: 0.3rem 0;
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
            }
        }
    }
}
</style>

