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
            <div class="button" @click="handleConfirm">确认支付</div>
        </div>
    </div>
</template>

<script>
import PackList from "@/common/servicePack";
import { paymentPushOrder } from "@/api/user";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            packageInfo: {},
            payOption: {
                appId: "",
                timeStamp: "",
                nonceStr: "",
                package: "",
                signType: "",
                paySign: ""
            }
        };
    },
    computed: {
        ...mapGetters(["openid"])
    },
    methods: {
        // 准备好微信sdk部分
        jsSdk() {
            // 判断微信的WeixinJSBridge
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener(
                        "WeixinJSBridgeReady",
                        this.onBridgeReady,
                        false
                    );
                } else if (document.attachEvent) {
                    document.attachEvent(
                        "WeixinJSBridgeReady",
                        this.onBridgeReady
                    );
                    document.attachEvent(
                        "onWeixinJSBridgeReady",
                        this.onBridgeReady
                    );
                }
            } else {
                this.onBridgeReady();
            }
        },
        // 支付sdk准备完成
        onBridgeReady() {
            // 触发微信支付
            WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                    appId: this.payOption.appId, //公众号名称，由商户传入
                    timeStamp: this.payOption.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: this.payOption.nonceStr, //随机串
                    package: this.payOption.package, //prepay_id用等式的格式
                    signType: this.payOption.signType, //微信签名方式：
                    paySign: this.payOption.paySign //微信签名
                },
                function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // 支付成功 返回成功页
                        let tempUrl = "//paysucc";
                        location.href = tempUr;
                    } else {
                        //  取消支付或者其他情况
                        let tempUrl = "//topay";
                        location.href = tempUrl;
                    }
                }
            );
        },
        // 确认支付
        async handleConfirm() {
            const openId = this.openid;
            const packId = this.$route.params.packageId;
            const userIds = this.$route.query.userIds.split(",");
            const data = {
                openId,
                packId,
                userIds
            };
            this.$loading.open();
            const res = await paymentPushOrder(data);
            this.$loading.close();
            if (res.STATUS === "1") {
                const orderId = res.ITEMS.id
                await this.$store.dispatch("setOrderList", this.openid);
                this.$router.push({
                    name: "packageInterest",
                    params: {
                        id: packId
                    },
                    query: {
                        orderId,
                        userId:userIds[0]
                    }
                });
            }
        }
    },
    created() {
        const id = this.$route.params.packageId;
        const userIds = this.$route.query.userIds.split(",");
        const packageInfo = PackList.find(item => item.id == id);
        let price = +packageInfo.price.split("/")[0];
        if (id == 10) {
            const addPrice = 800; //家庭服务包 3人每增加一人800
            userIds.forEach((item, index) => {
                if (index > 2) {
                    price += addPrice;
                }
            });
        }
        this.packageInfo = {
            price,
            title: packageInfo.title
        };
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
            background: url("~@/assets/images/weixin.png") center no-repeat;
            background-size: 0.36rem 0.36rem;
            left: 0.3rem;
            top: 0.3rem;
        }
        .mintui-field-success {
            position: absolute;
            right: 0.5rem;
            top: 0;
            color: #65d456;
            font-size: 0.4rem;
        }
    }
    .bot {
        position: absolute;
        bottom: 0;
        height: 1rem;
        line-height: 1rem;
        max-width: 7.5rem;
        display: flex;
        width: 100%;
        .count {
            font-size: 0.28rem;
        }
        .count,
        .button {
            text-align: center;
            width: 50%;
            .count_left {
                color: #888;
                margin-right: 0.2rem;
            }
        }
        .button {
            color: #fff;
            background-color: #ff7b72;
        }
    }
}
</style>

