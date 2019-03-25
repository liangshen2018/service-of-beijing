<template>
    <div class="page">
        <service-pack-item :list="list" @handleDetail="handleDetail"></service-pack-item>
    </div>
</template>

<script>
import list from "@/common/servicePack";
import servicePackItem from "@/components/servicePackItem/index";

export default {
    components: {
        servicePackItem
    },
    data() {
        return {
            list
        };
    },
    methods: {
        handleDetail(id) {
            this.$router.push({
                name: "servicePackDetail",
                params: {
                    id
                }
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
