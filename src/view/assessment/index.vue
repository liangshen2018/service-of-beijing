<template>
    <div class="page_info" v-show="isPageShow">
        <div class="page" @scroll="scrollEvent">
            <div class="form" v-for="(row,rowIndex) in formData" :key="rowIndex">
                <div class="caption" v-if="row.module">{{row.module}}</div>
                <div class="question" v-if="row.moduleHint">{{row.moduleHint}}</div>
                <div class="question" v-if="row.items[0].type !=='text'" style="font-weight:600">{{row.title}}</div>
                <div class="form_item">
                    <div v-for="(child,childIndex) in row.items" :key="childIndex">
                        <div class="input" v-if="child.type === 'text'">
                            <div class="label">{{row.title}}</div>
                            <div class="right">
                                <input type="text" :placeholder="`请输入`" v-model="form[child.code]">
                            </div>
                        </div>
                        <div class="checkbox" v-if="child.type === 'checkbox'">
                            <input type="checkbox" :id="row.code+childIndex" :value="child.text" @change="checkboxChange($event,child.clear,row.code,row.items)" v-model="form[row.code]">
                            <label :for="row.code+childIndex"><span>{{child.text}} </span><i></i></label>
                        </div>
                        <div class="checkbox" v-if="child.type === 'radio'">
                            <input type="radio" :id="row.code+childIndex" :value="child.text" @change="radioChange($event)" v-model="form[row.code]">
                            <label :for="row.code+childIndex">{{child.text}}</label>
                        </div>
                        <div class="show_more" v-if="child.showMore&&form[row.code] === child.text">
                            <div class="input" v-for="(extra,extraIndex) in [...Array(child.showMore)]" :key="extraIndex">
                                <div class="label">{{child['title'+(extraIndex+1)]}}:</div>
                                <div class="right">
                                    <input type="text" :placeholder="`请输入`" @focus="isShow =false" @blur="isShow =true" v-model="form[child.code][`text${extraIndex+1}`]">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="btn" v-if="isShow" @click="handleSubmit">提交</div>
    </div>
</template>

<script>
import {
    getAssessmentList,
    submitAssessment,
    getOrderInfoById
} from "@/api/user";
import buttonMixin from "@/common/buttonMixin";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            form: {},
            formData: [],
            userInfo: {},
            isPageShow: false,
            pageNo: 1,
            pages: null,
            data:[]
        };
    },
    computed: {
        ...mapGetters(["openid", "orderId", "equityId", "familyList"])
    },
    mixins: [buttonMixin],
    methods: {
        // 获取评估表信息
        async getAssessmentList(pageNo = 1) {
            const userId = this.$route.params.userId;
            const current = this.familyList.find(item => item.id == userId);
            this.$loading.open();
            const res = await getAssessmentList(pageNo, 10, current.sex);
            this.$loading.close();
            this.isPageShow = true;
            const form = {};
            if (res.STATUS === "1") {
                this.pages = res.ITEMS.pages;
                res.ITEMS.records.forEach(item => {
                    this.data.push(item);
                });
                this.data.forEach(col => {
                    if (col.items[0].type === "checkbox") {
                        form[col.code] = [];
                    } else if (col.items[0].type === "text") {
                        form[col.items[0].code] = "";
                    } else {
                        col.items.forEach(item => {
                            if (item.showMore) {
                                form[item.code] = {};
                                [...Array(item.showMore)].forEach(
                                    (child, index) => {
                                        form[item.code][`text${index + 1}`] =
                                            "";
                                    }
                                );
                            }
                        });
                        form[col.code] = "";
                    }
                });
                this.form = form;
                this.formData = this.data;
                this.getMemberInfo();
            }
        },
        checkboxChange(e, clear, prop, data) {
            const checked = e.target.checked;
            const value = e.target.value;
            const clearText = data.find(item => item.clear === 1).text;
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
        radioChange(e) {},
        // 提交
        async handleSubmit() {
            const items = [];
            this.formData.forEach(row => {
                Object.keys(this.form).forEach(key => {
                    const isHave = row.items.some(item => {
                        return item.code === key;
                    });
                    if (row.code === key || isHave) {
                        if (Array.isArray(this.form[key])) {
                            this.form[key].forEach(child => {
                                const formItem = {};
                                const current = row.items.find(
                                    item => item.text === child
                                );
                                formItem.answerCode = current.code;
                                formItem.text = current.text;
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
                            if (row.items[0].type === "radio") {
                                const formItem = {};
                                const current = row.items.find(
                                    item => item.text === this.form[key]
                                );
                                if (current) {
                                    formItem.answerCode = current.code;
                                    formItem.text = current.text;
                                    items.push(formItem);
                                }
                            } else if (row.items[0].type === "text") {
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
            const orderId = this.orderId;
            const packId = this.equityId;
            const userId = this.$route.params.userId;
            const doctorId = this.$route.params.doctorId;
            const data = {
                orderId,
                packId,
                userId,
                doctorId,
                userTypeId: 19, //一号系统会员类型Id,必传
                //一号系统家庭医生Id,若不传则无法自动分配家庭医生
                openId: this.openId, //用于调用微信推送
                beginDate: this.userInfo.startDate, //会员有效期开始时间
                endDate: this.userInfo.endDate, //会员有效期结束时间
                items
            };
            console.log(items);

            // this.$loading.open();
            // const res = await submitAssessment(data);
            // this.$loading.close();
            // if (res.STATUS === "1") {
            //     this.$router.push({
            //         name: "packageInterest",
            //         params: {
            //             id: packId
            //         },
            //         query: {
            //             orderId,
            //             userId
            //         }
            //     });
            // }
        },
        async getMemberInfo() {
            const orderId = this.orderId;
            const userId = this.$route.params.userId;
            // 身份显示
            const current = this.familyList.find(item => item.id == userId);
            this.form.Name = current.name;
            this.form.IDCard = current.idCard;
            // 获取用户beginDate endDate
            const res = await getOrderInfoById(orderId, userId);
            if (res.STATUS === "1") {
                const userInfo = res.ITEMS;
                this.userInfo = userInfo;
            }
        },
        scrollEvent(e) {
            //滚动的像素+容器的高度>可滚动的总高度-100像素
            // if (
            //     e.srcElement.scrollTop + e.srcElement.offsetHeight >
            //     e.srcElement.scrollHeight - 200
            // ) {
            //     this.pageNo++;
            //     if(this.pages && this.pageNo > this.pages) {
            //        return
            //     }
            //     this.getAssessmentList(this.pageNo);
            // }
        }
    },
    created() {
        this.getAssessmentList();
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1.5rem;
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
            }
            input[type="radio"],
            input[type="checkbox"] {
                display: none;
            }
            input[type="radio"] + label:before {
                content: "";
                width: 0.2rem;
                height: 0.2rem;
                border: 1px solid #ebebeb;
                position: absolute;
                left: 0;
                top: 0.1rem;
                border-radius: 50%;
                padding: 0.04rem;
            }
            input[type="checkbox"] + label > i {
                content: "";
                width: 0.3rem;
                height: 0.3rem;
                border: 1px solid #ebebeb;
                position: absolute;
                left: 0;
                top: 0.1rem;
            }
            input[type="radio"]:checked + label::before {
                background-color: #ff7b72;
                background-clip: content-box;
                border-color: #ff7b72;
            }
            input[type="checkbox"]:checked + label > i {
                border-color: #ff7b72;
                background-color: #ff7b72;
            }
            input[type="checkbox"]:checked + label > i::after {
                content: "";
                transform: rotate(45deg);
                font-size: 0;
                width: 0.06rem;
                height: 0.12rem;
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

