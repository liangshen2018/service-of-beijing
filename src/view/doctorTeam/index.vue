<template>
    <div class="page">
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardItem from "@/components/CardItem/index";
import Data from "./tpl/member";
export default {
    components: {
        CardItem
    },
    data() {
        return {
            list: []
        };
    },
    computed: {
        ...mapGetters(["equityId"])
    },
    methods: {
        handleDetail({ id }) {
            this.$router.push({
                name: "teamDetail",
                params: {
                    id
                },
                query: {
                    userId: this.$route.params.userId,
                    status: this.$route.query.status
                }
            });
        },
        getDoctorList() {
            const packList = [
                { id: 3, manage: "pediatric" },
                { id: 8, manage: "TCM" },
                { id: 9, manage: "TCM" },
                { id: 11, manage: "pediatric" }
            ];
            const packId = this.equityId;
            const current = packList.find(item => item.id == packId);
            const list = [];
            Data.forEach(item => {
                if (current) {
                    if(current.manage === item.manage){
                        list.push({
                        id: item.id,
                        img: item.headImg,
                        team: item.teamName
                    });
                    }
                } else {
                    list.push({
                        id: item.id,
                        img: item.headImg,
                        team: item.teamName
                    });
                }
            });
            this.list = list;
        }
    },
    created() {
        this.getDoctorList();
    }
};
</script>

<style lang="less" scoped>
</style>

