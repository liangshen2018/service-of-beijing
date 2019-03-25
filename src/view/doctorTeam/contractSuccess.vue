<template>
    <div class="page">
        <div class="section">
            <div class="title">
                <i class="mint-toast-icon mintui mintui-field-success"></i>
                <span>您已成功签约家庭医生！</span>
            </div>
            <div class="content">
                <span class="label">签约患者：</span>
                <span>xxxx</span>
            </div>
            <div class="content">
                <span class="label">家庭医生：</span>
                <span>xxxx</span>
            </div>
        </div>
        <div class="button"><span>查看服务详情</span></div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.page {
    .section {
        margin: 0.6rem;
        padding: 1rem 0.5rem;
        font-size: 0.32rem;
        border: 1px solid #F5F5F5;
        border-radius: 4px;
        .title {
            position: relative;
            padding-left: 0.7rem;
            line-height: 0.8rem;
            .mintui-field-success {
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
                top: 0;
                left: 0;
                color: #09bb07;
                font-size: 0.5rem;
            }
        }
        .content {
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.32rem;
            .label {
                color:#929292;
            }
        }
    }
    .button {
        position: absolute;
        bottom: 2rem;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        span {
            display: inline-block;
            width: 80%;
            height: 100%;
            border: 1px solid #E5E5E5;
            border-radius: .5rem;
        }
    }
}
</style>

