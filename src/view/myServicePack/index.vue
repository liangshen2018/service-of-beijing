<template>
    <div class="page">
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
        <div class="empty" v-if="list.length === 0">
            暂无服务包
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
            list: []
        };
    },
    computed: {
        ...mapGetters(["openid"])
    },
    methods: {
        handleDetail(id) {
            this.$store.commit("SET_EQUITY_ID", id);
            this.$router.push({
                name: "packageInterest",
                params: {
                    id
                }
            });
        },
        async getOrderList() {
            const res = await getOrderList(this.openid);
            const list = [];
            // ids.forEach(id => {
            //     const item = list.find(child => child.id == id);
            //     list.push(item);
            // });
            // this.list = list
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
     color: #ABABAB;
 }
</style>

