<template>
    <div class="page">
        <div class="page_header" @click="handleEdit">
            <div class="name">{{babyInfo.name}}<span class="sex">{{babyInfo.sex}}</span></div>
            <div class="age">{{babyInfo.age}}</div>
            <i class="iconfont icon-arrow-right-copy-copy-copy"></i>
        </div>
        <div class="row">
            <div class="tab_left fl" :class="{'active': active==='tab1'}" @click="active ='tab1'">专属病历</div>
            <div class="tab_right fr" :class="{'active': active==='tab2'}" @click="active ='tab2'">基本信息</div>
        </div>
        <mt-tab-container v-model="active" swipeable>
            <mt-tab-container-item id="tab1">
                <div class="empty">暂无病历</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <div class="row" v-for="(item,index) in babyData" :key="index">
                    <div class="fl label">{{item.label}}</div>
                    <div class="fr value">{{item.value?item.value : '暂无'}}</div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { formatSex, getBabyAge } from "@/utils";
export default {
    data() {
        return {
            active: "tab2",
            babyData: [
                { label: "身份证", prop: "idCard" },
                { label: "性别", prop: "sex" },
                { label: "出生日期", prop: "birthday" },
                { label: "ABO血型", prop: "bloodType" },
                { label: "RH血型", prop: "bloodTypeRh" },
                { label: "过敏史", prop: "allergy" },
                { label: "先天性疾病", prop: "diseases" },
            ],
            babyInfo:{
                name:'',
                sex:'',
                age:''
            }
        };
    },
    computed: {
        ...mapGetters(["familyList"]),
   },
    methods: {
        // 去修改
        handleEdit() {
            this.$router.push({
                name: "babyUpdate",
                params: {
                    id: this.$route.params.id
                },
                query: {
                    redirect: this.$route.path
                }
            });
        },
        // 获取 成员信息
        getPageData() {
            const id = this.$route.params.id;
            const current = this.familyList.find(item => item.id == id);
            this.babyInfo = {
                name: current.name,
                sex: formatSex(current.sex),
                age: getBabyAge(current.birthday)
            }
            this.babyData.forEach(item => {
                Object.keys(current).forEach(key => {
                    if (item.prop === key) {
                        if (key === "sex") {
                            item.value = current[key]
                                ? formatSex(current[key])
                                : "";
                        } else if (key === "birthday") {
                            item.value = current[key]
                                ? moment(current[key]).format("YYYY-MM-DD")
                                : "";
                        } else {
                            item.value = current[key] ? current[key] : "";
                        }
                    }
                });
            });
        }
    },
    created() {
        this.getPageData();
    }
};
</script>

<style lang="less" scoped>
.page {
    .page_header {
        height: 3rem;
        padding-top: 0.8rem;
        padding-left: 0.4rem;
        background: url("~@/assets/images/user_h.png") no-repeat;
        background-size: cover;
        color: #fff;
        position: relative;
        .name {
            font-size: 0.36rem;
            font-weight: 500;
            .sex {
                margin-left: 0.2rem;
            }
        }
        .age {
            margin-top: 0.2rem;
            font-size: 0.3rem;
        }
        .icon-arrow-right-copy-copy-copy {
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
            font-size: 0.36rem;
            right: 0.4rem;
            top: 1rem;
        }
    }
    .row {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.28rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid #f8f8f8;
        .label {
            color: #7d7d7d;
        }
        .tab_left,
        .tab_right {
            width: 50%;
            text-align: center;
            color: #7d7d7d;
            &.active {
                color: #ff8c84;
            }
        }
    }

    .empty {
        text-align: center;
        line-height: 3rem;
        color: #7d7d7d;
    }
}
</style>

