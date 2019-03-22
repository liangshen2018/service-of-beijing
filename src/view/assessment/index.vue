<template>
    <div class="page">
        <div class="form">
            <div class="caption">基本信息</div>
            <div class="form_item">
                <div class="input">
                    <div class="label">姓名</div>
                    <div class="right">
                        <input type="text" placeholder="请输入宝贝姓名" v-model="form.name">
                    </div>
                </div>
                <div class="checkbox">
                    <mt-checklist v-model="form.value" :options="['选项A', '选项B', '选项C']">
                    </mt-checklist>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: "",
                value:[]
            }
        };
    }
};
</script>

<style lang="less" scoped>
.page {
    .form {
        padding: 0.4rem;
        .caption {
            font-weight: 600;
            font-size: .32rem;
        }
        .input {
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.28rem;
            .label {
                float: left;
            }
            .right {
                overflow: hidden;
                input[type="text"] {
                    width: 100%;
                    text-align: right;
                }
                label {
                    position: relative;
                    padding: 0 0.3rem;
                    font-size: 0.28rem;
                }
            }
        }
    }
}
</style>

