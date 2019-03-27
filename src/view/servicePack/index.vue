<template>
    <div class="page">
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
    </div>
</template>

<script>
import list from "@/common/servicePack";
import CardItem from "@/components/CardItem/index";

export default {
    components: {
        CardItem
    },
    data() {
        return {
            list
        };
    },
    methods: {
        handleDetail({id}) {
            this.$router.push({
                name: "servicePackDetail",
                params: {
                    id
                },
            });
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: .5rem;
}
</style>
