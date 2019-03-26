<template>
    <div class="page">
        <div class="doctor_info">
            <div class="img"><img src="" alt=""></div>
            <div class="right">
                <div class="top"><span class="name">张萌</span><span>内科</span><span>主治医师</span></div>
                <p>高新区南新社区卫生服务中</p>
            </div>
        </div>
        <div class="introduce">
            <h3>医生介绍</h3>
            <p :class="{'three-cut':isHidden}">主任医师，教授，博士生导师，国家级名老中医药专家，全国优秀 中医临床研修老师，北京市中医住院医师规范化培训师承执导老师 全国中医院优秀院长，受教于中医大师刘渡舟教授、苏宝主任医师，教授，博士生导师，</p>
        </div>
        <div class="introduce">
            <h3>医生擅长</h3>
            <p>对中医内伤杂病，人体血管疾病等有较深造诣。临床诊治中医内科 杂病、肾病、妇科病症</p>
        </div>
        <div class="introduce">
            <h3>预约建档</h3>
            <div class="form_item">
                <div class="label"><span class="red">*</span>建档时间</div>
                <div class="right" @click="openPicker">
                    <input type="text" placeholder="请选择时间" readonly v-model="form.time">
                </div>
            </div>
        </div>
        <div class="btn" @click="handleContract">签约家庭医生</div>
        <mt-datetime-picker ref="picker" type="datetime" :startDate="new Date()" @confirm="handleConfirm" v-model="pickerValue">
        </mt-datetime-picker>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            isHidden: true,
            form: {
                time: ""
            },
            pickerValue: ""
        };
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(val) {
            const time = moment(val).format("YYYY-MM-DD HH:mm");
            this.form.time = time;
        },
        handleContract() {
            if (!this.form.time) {
                this.$message("请选择预约时间");
                return;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    .doctor_info {
        height: 3rem;
        padding-top: 0.8rem;
        padding-left: 0.4rem;
        background: url("~@/assets/images/user_h.png") no-repeat;
        background-size: cover;
        .img {
            width: 1.2rem;
            height: 1.2rem;
            float: left;
            border-radius: 50%;
        }
        .right {
            color: #fff;
            font-size: 0.28rem;
            padding-left: 0.3rem;
            overflow: hidden;
            .name {
                font-size: 0.36rem;
            }
            span {
                margin-right: 0.2rem;
            }
            p {
                line-height: 1rem;
            }
        }
    }
    .introduce {
        padding: 0.3rem;
        h3 {
            font-size: 0.3rem;
            line-height: 1rem;
        }
        p {
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #a0a0a0;
        }
        .form_item {
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.24rem;
            border-bottom: 1px solid #f2f2f2;
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
                    color: #a0a0a0;
                }
            }
        }
    }
}
</style>

