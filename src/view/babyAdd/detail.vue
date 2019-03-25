<template>
    <div class="page">
        <div class="page_header" @click="handleEdit">
            <div class="name">张三 <span class="sex">(男)</span></div>
            <div class="age">1个月</div>
            <i class="iconfont icon-arrow-right-copy-copy-copy"></i>
        </div>
        <div class="row">
            <div class="fl label">家庭医生</div>
            <div class="fr value">数思都</div>
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
export default {
    data() {
        return {
            active: "tab2",
            babyData: [
                { label: "身份证" },
                { label: "体重" },
                { label: "出生医院" },
                { label: "出生情况" },
                { label: "ABO血型" },
                { label: "RH血型" },
                { label: "过敏史" },
                { label: "先天性疾病" }
            ]
        };
    },
    methods:{
        handleEdit() {
            this.$router.push({
                name:'babyUpdate',
                params:{
                    id:this.$route.params.id
                },
                query: {
                    redirect: this.$route.path
                }
            })
        }
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
            width: .4rem;
            height: 0.4rem;
            font-size: .36rem;
            right: .4rem;
            top:1rem;
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

