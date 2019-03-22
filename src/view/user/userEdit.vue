<template>
    <div class="page">
        <div class="row" v-for="(item,index) in userData" :key="index">
            <div class="fl label">{{item.label}}</div>
            <div class="fr value">{{item.value?item.value : ''}} <span class="button"></span></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: [
                { label: "昵称", value: "dsadsa" },
                { label: "已绑定手机", value: "18545678941" },
                { label: "切换账号", value: "" }
            ]
        };
    }
};
</script>

<style lang="less" scoped>
.page {
    .row {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid #f8f8f8;
        .label {
            color: #7d7d7d;
        }
        .button {
            width: 0.32rem;
            height: 0.32rem;
            display: inline-block;
            background: url("~@/assets/images/edit.png") no-repeat;
            background-size: cover;
            margin-left: 0.3rem;
        }
    }
}
</style>

