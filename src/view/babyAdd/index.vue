<template>
    <div class="page">
        <div class="form">
            <div class="form_item">
                <div class="label">姓名</div>
                <div class="right">
                    <input type="text" placeholder="请输入宝贝姓名" v-model="form.name">
                </div>
            </div>
            <div class="form_item">
                <div class="label">性别</div>
                <div class="right" style="text-align:right">
                    <input type="radio" id="one" value="1" v-model="form.sex" class="radio">
                    <label for="one">男</label>
                    <input type="radio" id="two" value="2" v-model="form.sex" class="radio">
                    <label for="two">女</label>
                </div>
            </div>
            <div class="form_item">
                <div class="label">出生日期</div>
                <div class="right" @click="openPicker">
                    <input type="text" placeholder="请选择出生日期" readonly v-model="form.birthday">
                </div>
            </div>
            <div class="form_item">
                <div class="label">身份证</div>
                <div class="right">
                    <input type="text" placeholder="请输入身份证号" v-model="form.idCard">
                </div>
            </div>
        </div>
        <div class="btn" @click="handleSubmit">提交</div>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date('1990-10-10')" :endDate="new Date()" @confirm="handleConfirm" v-model="pickerValue">
        </mt-datetime-picker>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            form: {
                name: "",
                sex: "1",
                birthday: "",
                idCard: ""
            },
            pickerValue: ""
        };
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(val) {
            this.form.birthday = moment(val).format("YYYY-MM-DD");
        },
        handleSubmit() {}
    }
};
</script>

<style lang="less" scoped>
.page {
    font-size: 0.3rem;
    .btn {
        position: absolute;
        bottom: 0;
    }
    .form {
        .form_item {
            height: 1rem;
            line-height: 1rem;
            padding: 0 0.3rem;
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
                    margin-right: 0.1rem;
                    position: relative;
                    padding: 0 0.3rem;
                    font-size: 0.28rem;
                }
                input[type="radio"] + label:before {
                    content: "";
                    font-size: 0;
                    width: 0.18rem;
                    height: 0.18rem;
                    border: 1px solid #cccc;
                    position: absolute;
                    left: -0.15rem;
                    top: 0rem;
                    border-radius: 50%;
                    padding: 0.04rem;
                }
                input[type="radio"]:checked + label:before {
                    background-color: #ff7b72;
                    background-clip: content-box;
                    border-color: #ff7b72;
                }
            }
            .radio {
                display: none;
            }
        }
    }
}
</style>
