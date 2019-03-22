<template>
    <div class="page">
        <div class="header">
            <div>某某的签约医生</div>
        </div>
        <team-self :list="list" @handleCancel="handleCancel"></team-self>
        <div class="btn" @click="callPhone">联系医生</div>
    </div>
</template>

<script>
import teamSelf from "./components/teamSelf";

export default {
    components: {
        teamSelf
    },
    data() {
        return {
            list: [{}]
        };
    },
    methods: {
        handleCancel() {},
        callPhone() {
            window.location.href = "tel://" + 12345678901;
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    .header {
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.3rem;
        padding: 0 0.3rem;
        color: #030303;
        border-bottom: 1px solid #f7f7f7;
    }
    .btn {
        position: absolute;
        bottom: 0;
    }
}
</style>

