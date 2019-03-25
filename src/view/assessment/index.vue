<template>
    <div class="page">
        <div class="form" v-for="(row,rowIndex) in formData" :key="rowIndex">
            <div class="caption" v-if="row.Module">{{row.Module}}</div>
            <div class="question" v-if="row.ModuleHint">{{row.ModuleHint}}</div>
            <div class="question" v-if="row.Items[0].Type !=='text'" style="font-weight:600">{{row.Title}}</div>
            <div class="form_item">
                <div v-for="(child,childIndex) in row.Items" :key="childIndex">
                    <div class="input" v-if="child.Type === 'text'">
                        <div class="label">{{row.Title}}</div>
                        <div class="right">
                            <input type="text" :placeholder="`请输入`" v-model="form[child.Code]">
                        </div>
                    </div>
                    <div class="checkbox" v-if="child.Type === 'checkbox'">
                        <input type="checkbox" :id="row.Code+childIndex" :value="child.Text" @change="checkboxChange($event,child.Clear,row.Code,row.Items)" v-model="form[row.Code]">
                        <label :for="row.Code+childIndex"><span>{{child.Text}}  </span><i></i></label>
                    </div>
                    <div class="checkbox" v-if="child.Type === 'radio'">
                        <input type="radio" :id="row.Code+childIndex" :value="child.Text" @change="radioChange($event)" v-model="form[row.Code]">
                        <label :for="row.Code+childIndex">{{child.Text}}</label>
                    </div>
                    <div class="show_more" v-if="child.ShowMore&&form[row.Code] === child.Text">
                        <div class="input" v-for="(extra,extraIndex) in [...Array(child.ShowMore)]" :key="extraIndex">
                            <div class="label">{{child['Title'+(extraIndex+1)]}}:</div>
                            <div class="right">
                                <input type="text" :placeholder="`请输入`" v-model="form[child.Code][`text${extraIndex+1}`]">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn" @click="handleSubmit">提交</div>
    </div>
</template>

<script>
import { getAssessmentList, submitAssessment } from "@/api/user";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            form: {},
            formData: []
        };
    },
    computed: {
        ...mapGetters(["openid"])
    },
    methods: {
        // 获取评估表信息
        async getAssessmentList() {
            this.$loading.open();
            const res = await getAssessmentList(19, 1);
            this.$loading.close();
            const form = {};
            if (res.STATUS === "1") {
                const data = JSON.parse(res.ITEMS).Data;
                data.forEach(col => {
                    if (col.Items[0].Type === "checkbox") {
                        form[col.Code] = [];
                    } else if (col.Items[0].Type === "text") {
                        form[col.Items[0].Code] = "";
                    } else {
                        col.Items.forEach(item => {
                            if (item.ShowMore) {
                                form[item.Code] = {};
                                [...Array(item.ShowMore)].forEach(
                                    (child, index) => {
                                        form[item.Code][`text${index + 1}`] =
                                            "";
                                    }
                                );
                            }
                        });
                        form[col.Code] = "";
                    }
                });
                this.form = form;
                this.formData = data;
            }
        },
        checkboxChange(e, clear, prop, data) {
            const checked = e.target.checked;
            const value = e.target.value;
            const clearText = data.find(item => item.Clear === 1).Text;
            if (!clearText) {
                return;
            }
            if (checked) {
                if (clear === 1) {
                    this.form[prop] = [value];
                } else {
                    const idx = this.form[prop].findIndex(
                        item => item === clearText
                    );
                    if (idx !== -1) {
                        this.form[prop].splice(idx, 1);
                    }
                }
            }
        },
        radioChange(e) {
            console.log(e);
        },
        // 提交
        async handleSubmit() {
            const items = [];
            this.formData.forEach(row => {
                Object.keys(this.form).forEach(key => {
                    const isHave = row.Items.some(item => {
                        return item.Code === key;
                    });
                    if (row.Code === key || isHave) {
                        if (Array.isArray(this.form[key])) {
                            this.form[key].forEach(child => {
                                const formItem = {};
                                const current = row.Items.find(
                                    item => item.Text === child
                                );
                                formItem.answerCode = current.Code;
                                formItem.text = current.Text;
                                items.push(formItem);
                            });
                        } else if (
                            Object.prototype.toString.call(this.form[key]) ===
                            "[object Object]"
                        ) {
                            Object.keys(this.form[key]).forEach(item => {
                                const formItem = {};
                                const value = this.form[key][item];
                                if (value) {
                                    formItem[item] = value;
                                    formItem.answerCode = key;
                                    items.push(formItem);
                                }
                            });
                        } else {
                            if (row.Items[0].Type === "radio") {
                                const formItem = {};
                                const current = row.Items.find(
                                    item => item.Text === this.form[key]
                                );
                                if (current) {
                                    formItem.answerCode = current.Code;
                                    formItem.text = current.Text;
                                    items.push(formItem);
                                }
                            } else if (row.Items[0].Type === "text") {
                                console.log(11);

                                if (this.form[key]) {
                                    const formItem = {};
                                    formItem.answerCode = key;
                                    formItem.text = this.form[key];
                                    items.push(formItem);
                                }
                            }
                        }
                    }
                });
            });
            console.log(items);
            const data = {
                userTypeId: 21, //一号系统会员类型Id,必传
                doctorId: 223, //一号系统家庭医生Id,若不传则无法自动分配家庭医生
                openId: this.openId, //用于调用微信推送
                beginDate: "2018-01-01", //会员有效期开始时间
                endDate: "2020-01-01", //会员有效期结束时间
                items
            };
            // const res = await submitAssessment(data);
        }
    },
    created() {
        this.getAssessmentList();
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1.5rem;
    .btn {
        position: absolute;
        bottom: 0;
    }
    .form {
        padding: 0 0.4rem;
        .caption {
            font-weight: 600;
            font-size: 0.32rem;
            padding: 0.3rem 0;
        }
        .question {
            font-size: 0.3rem;
            padding: 0.2rem 0;
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
        .checkbox {
            height: 0.5rem;
            line-height: 0.5rem;
            position: relative;
            label {
                font-size: 0.28rem;
                display: inline-block;
                padding-left: 0.5rem;
                width: 100%;
            }
            input[type="radio"],
            input[type="checkbox"] {
                display: none;
            }
            input[type="radio"] + label:before {
                content: "";
                font-size: 0;
                width: 0.2rem;
                height: 0.2rem;
                border: 1px solid #cccc;
                position: absolute;
                left: 0;
                top: 0.1rem;
                border-radius: 50%;
                padding: 0.04rem;
            }
            input[type="checkbox"] + label > i {
                content: "";
                font-size: 0;
                width: .3rem;
                height: .3rem;
                border: 1px solid #cccc;
                position: absolute;
                left: 0;
                top: 0.1rem;
            }
            input[type="radio"]:checked + label:before {
                background-color: #ff7b72;
                background-clip: content-box;
                border-color: #ff7b72;
            }
            input[type="checkbox"]:checked + label > i {
                border-color: #ff7b72;
                background-color: #ff7b72;
            }
            input[type="checkbox"] + label > i::after {
                content: "";
                transform: rotate(45deg);
                font-size: 0;
                width: .06rem;
                height:0.12rem;
                border: 1px solid #cccc;
                position: absolute;
                left: 0.1rem;
                top: 0.03rem;
                content: "";
                border: solid 2px #fff;
                border-left: none;
                border-top: none;
            }
        }
        .show_more {
            .input {
                height: 0.5rem;
                line-height: 0.5rem;
                font-size: 0.28rem;
                .label {
                    float: left;
                }
                .right {
                    overflow: hidden;
                    input[type="text"] {
                        width: 100%;
                        text-align: left;
                        padding: 0 0.3rem;
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
}
</style>

