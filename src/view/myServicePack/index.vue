<template>
    <div class="page">
        <service-pack-item :list="list" @handleDetail="handleDetail"></service-pack-item>
    </div>
</template>

<script>
import servicePackItem from "@/components/servicePackItem/index";
import list from "@/common/servicePack";
export default {
    components: {
        servicePackItem
    },
    data() {
        const currentList = [];
        const ids = [1, 2]; //服务包Id
        ids.forEach(id => {
            const item = list.find(child => child.id == id);
            currentList.push(item);
        });
        return {
            list: currentList
        };
    },
    methods: {
        handleDetail(id) {
            this.$router.push({
                name: "packageInterest",
                params: {
                    id
                }
            });
        }
    }
};
</script>

<style>
</style>
