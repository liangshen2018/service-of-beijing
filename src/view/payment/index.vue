<template>
    <div class="page">
        <div class="package">
            <div class="title fl">{{packageInfo.title}}</div>
            <div class="right fr">{{packageInfo.price}}元</div>
        </div>
        <div class="mode">支付方式</div>
        <div class="mode_item">
            <i class="weixin"></i>
            <span>微信支付</span>
            <i class="mint-toast-icon mintui mintui-field-success"></i>
        </div>
        <div class="bot">
            <div class="count"><span class="count_left">合计支付:</span>{{packageInfo.price}}元</div>
            <div class="btn">确认支付</div>
        </div>
    </div>
</template>

<script>
import PackList from "@/common/servicePack";
export default {
    data() {
        return {
            packageInfo: {}
        };
    },
    created() {
        const id = this.$route.params.id;
        const packageInfo = PackList.find(item => item.id == id);
        packageInfo.price = packageInfo.price.split("/")[0];
        this.packageInfo = packageInfo;
    }
};
</script>

<style lang="less" scoped>
.page {
    .package {
        height: 2rem;
        line-height: 2rem;
        padding: 0 0.3rem;
        font-size: 0.32rem;
        border-bottom: 1px solid #f7f7f7;
    }
    .mode {
        padding: 0 0.3rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: rgba(3, 3, 3, 1);
        line-height: 0.8rem;
        border-bottom: 1px solid #f7f7f7;
    }
    .mode_item {
        color: #d1d1d1;
        font-size: 0.24rem;
        padding-left: 0.8rem;
        height: 1rem;
        line-height: 1rem;
        position: relative;
        .weixin {
            width: 0.36rem;
            height: 0.36rem;
            position: absolute;
            background: url("~@/assets/images/weixin.png") no-repeat;
            left: 0.3rem;
            top: 0.3rem;
        }
        .mintui-field-success {
            position: absolute;
            right: 0.5rem;
            top: 0.05rem;
            color: #65d456;
        }
    }
    .bot {
        position: absolute;
        bottom: 0;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        width: 100%;
        .count {
            font-size: 0.28rem;
        }
        .count,
        .btn {
            text-align: center;
            width: 50%;
            .count_left {
                color: #888;
                margin-right: 0.2rem;
            }
        }
    }
}
</style>

