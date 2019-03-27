<template>
    <div class="page">
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
        <div class="empty" v-if="list.length === 0">
            {{empty}}
        </div>
    </div>
</template>

<script>
import CardItem from "@/components/CardItem/index";
import packList from "@/common/servicePack";
import { getOrderList } from "@/api/user";
import { mapGetters } from "vuex";

export default {
    components: {
        CardItem
    },
    data() {
        return {
            packList,
            list: [],
            empty: ""
        };
    },
    computed: {
        ...mapGetters(["openid", "orderList"])
    },
    methods: {
        handleDetail(item) {
            this.$router.push({
                name: "packageInterest",
                params: {
                    id: item.id
                },
                query: {
                    orderId: item.orderId
                }
            });
        },
        async getOrderList() {
            let d ;
            if (!this.orderList || this.orderList.length === 0) {
                const res = await this.$store.dispatch(
                    "setOrderList",
                    this.openid
                );
                d = res
            }else {
                d = this.orderList
            }
            const list = [];
            if (d && d.length > 0) {
                d.forEach(item => {
                    const current = this.packList.find(
                        pack => pack.id == item.packId
                    );
                    const user = item.users.map(child => child.name);
                    list.push({
                        ...current,
                        orderId: item.id,
                        name: user.join("/")
                    });
                });
                this.list = list;
            } else {
                this.empty = "暂无服务包";
            }
        }
    },
    created() {
        this.getOrderList();
    }
};
</script>

<style lang="less" scoped>
.empty {
    margin: 4rem 0;
    text-align: center;
    color: #ababab;
}
</style>

