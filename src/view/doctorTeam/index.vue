<template>
    <div class="page">
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
    </div>
</template>

<script>
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
    methods: {
        handleDetail({id}) {
            this.$router.push({
                name: 'teamDetail',
                params: {
                    id,
                },
                query: {
                    userId:this.$route.params.userId,
                    status:this.$route.query.status
                }
            })
        },
        getDoctorList() {
            const list = [];
            Data.forEach(item => {
                list.push({
                    id: item.id,
                    img: item.headImg,
                    team: item.teamName
                });
            });
            this.list = list;
        }
    },
    created() {
        this.getDoctorList()
    }
};
</script>

<style lang="less" scoped>
</style>

