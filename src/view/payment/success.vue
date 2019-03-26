<template>
    <div class="page">
        <div class="icon">
            <i class="mint-toast-icon mintui mintui-field-success"></i>
        </div>
        <p class="success">恭喜您支付成功</p>
        <p>购买服务包成功后，请选择一位医生成为您的家庭医生。</p>
        <div class="btn" @click="handleTeam">签约家庭医生</div>
    </div>
</template>

<script>
export default {
    methods: {
        handleTeam() {
            const packageId = this.$route.params.packageId;
            this.$store.commit("SET_EQUITY_ID", packageId);
            this.$store;
            this.$router.push({
                name: "doctorTeam",
                params: {
                    packageId
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    text-align: center;
    .icon {
        margin: 3rem auto 0.2rem;
        .mintui-field-success {
            font-size: 1.5rem;
            color: #00c000;
        }
    }
    p {
        color: #8e8e8e;
        font-size: 0.24rem;
        margin-top: 0.3rem;
        padding: 0 1.5rem;
        line-height: 0.4rem;
    }
    .success {
        font-size: 0.4rem;
        color: #454545;
    }
}
</style>
