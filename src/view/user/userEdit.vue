<template>
    <div class="page">
        <div class="row" v-for="(item,index) in userData" :key="index">
            <div class="fl label">{{item.label}}</div>
            <div class="fr value" @click="item.func">{{item.value?item.value : ''}} <span class="button"></span></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { userNameEdit } from "@/api/user";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["openid", "userInfo", "appid"]),
        userData() {
            const userData = [
                {
                    label: "昵称",
                    value: this.userInfo.name,
                    func: this.handleEditName
                },
                {
                    label: "已绑定手机",
                    value: this.userInfo.phone,
                    func: this.handleEditPhone
                }
            ];
            return userData;
        }
    },
    methods: {
        handleEditPhone() {
            this.$router.push({
                name: "phoneEdit",
                query: {
                    redirect: `/user/${this.openid}/${this.appid}`
                }
            });
        },
        async handleEditName() {
            try {
                const val = await MessageBox.prompt("请输入昵称", {});
                const data = {
                    name: val.value,
                    openid: this.openid
                };
                if (!val.value) {
                    this.$message("昵称不能为空");
                    return;
                }
                 if (val.value.length > 10) {
                    this.$message("昵称过长");
                    return;
                }
                this.$loading.open();
                const res = await userNameEdit(data);
                if (res.STATUS === "1") {
                    this.$store
                        .dispatch("setUserInfo", this.openid)
                        .then(() => {
                            this.$loading.close();
                            this.$router.back()
                        });
                }
            } catch (e) {}
        }
    },
    created() {}
};
</script>

<style lang="less" scoped>
.page {
    .row {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        padding: 0 0.4rem;
        border-bottom: 1px solid #f8f8f8;
        .label {
            color: #7d7d7d;
        }
        .button {
            width: 0.32rem;
            height: 0.32rem;
            display: inline-block;
            background: url("~@/assets/images/edit.png") no-repeat;
            background-size: cover;
            margin-left: 0.3rem;
        }
    }
}
</style>

