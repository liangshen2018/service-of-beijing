<template>
    <div class="page">
        <div class="icon">
            <i class="mint-toast-icon mintui mintui-field-success"></i>
        </div>
        <p class="success">恭喜您支付成功</p>
        <p>购买服务包成功后，请选择一位医生成为您的家庭医生。</p>
        <div class="btn">签约家庭医生</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.page {
    text-align: center;
    .icon {
        margin: 3rem auto .2rem ;
        .mintui-field-success {
            font-size: 1.5rem;
            color: #00C000;
        }
    }
    p {
        color: #8E8E8E;
        font-size: .24rem;
        margin-top: .3rem;
        padding: 0 1.5rem;
        line-height: .4rem;
    }
    .success {
        font-size: .4rem;
        color: #454545;
    }
    .btn {
        position: absolute;
        bottom: 0;
    }
}
</style>
