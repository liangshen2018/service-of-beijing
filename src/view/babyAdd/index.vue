<template>
    <div class="page_info">
        <div class="page">
            <div class="form">
                <div class="form_item" v-for="(item,index) in formData" :key="index">
                    <div class="label">{{item.label}}</div>
                    <template v-if="item.type === 'text'">
                        <div class="right" @click="item.func?item.func(item):{}">
                            <input type="text" :placeholder="item.placeholder" @change="item.prop === 'idCard'?idCardChange(item):{}" :disabled="item.readonly" v-model="form[item.prop]">
                        </div>
                    </template>
                    <template v-if="item.type === 'select'">
                        <div class="right" :class="{'placeholder': !form[item.prop]}" style="text-align:right" @click="item.func?item.func(item):{}">
                            {{form[item.prop] ? form[item.prop] :item.placeholder}}
                        </div>
                    </template>
                    <template v-if="item.type === 'radio'">
                        <div class="right" style="text-align:right">
                            <template v-for="opt in item.opt">
                                <input type="radio" :id="`_${opt.label}`" :value="opt.value" v-model="form[item.prop]" class="radio">
                                <label :for="`_${opt.label}`">{{opt.label}}</label>
                            </template>
                        </div>
                    </template>
                </div>
            </div>

        </div>
        <div class="btn" @click="handleSubmit" v-if="isShow">提交</div>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date('1900-01-01')" :endDate="new Date()" @confirm="handleConfirm" v-model="pickerValue">
        </mt-datetime-picker>
        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <div class="content">
                <mt-radio align="right" v-model="radioValue" @change="radioChange(radioValue,options)" :options="options">
                </mt-radio>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import buttonMixin from "@/common/buttonMixin";
import moment from "moment";
import { userFamilyEdit, getFamilyList } from "@/api/user";
import { mapGetters } from "vuex";
import { getRelation } from "@/api/calalog";
export default {
    data() {
        const formData = [
            {
                prop: "name",
                label: "姓名",
                placeholder: "请输入成员姓名",
                type: "text",
                pattern: /^[\u4E00-\u9FA5A-Za-z]{1,10}$/,
                message: "姓名输入不合法"
            },
            {
                prop: "sex",
                label: "性别",
                placeholder: "请选择性别",
                type: "radio",
                opt: [
                    {
                        value: "1",
                        label: "男"
                    },
                    {
                        value: "2",
                        label: "女"
                    }
                ]
            },
            {
                prop: "idCard",
                label: "身份证",
                placeholder: "请输入成员身份证",
                type: "text",
                pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                message: "请输入正确的身份证"
            },

            {
                prop: "birthday",
                label: "出生日期",
                placeholder: "请选择出生日期",
                type: "select",
                func: this.openPicker,
                readonly: true
            },

            {
                prop: "bloodType",
                label: "ABO血型",
                placeholder: "请选择ABO血型",
                type: "select",
                func: this.openVisible,
                readonly: true,
                opt: [
                    {
                        value: "1",
                        label: "A"
                    },
                    {
                        value: "2",
                        label: "B"
                    },
                    {
                        value: "3",
                        label: "O"
                    },
                    {
                        value: "4",
                        label: "AB"
                    },
                    {
                        value: "5",
                        label: "不详"
                    }
                ]
            },
            {
                prop: "bloodTypeRh",
                label: "RH血型",
                placeholder: "请选择RH血型",
                type: "select",
                func: this.openVisible,
                readonly: true,
                opt: [
                    {
                        value: "1",
                        label: "阴"
                    },
                    {
                        value: "2",
                        label: "阳"
                    },
                    {
                        value: "3",
                        label: "不详"
                    },
                    {
                        value: "4",
                        label: "未查"
                    }
                ]
            },
            {
                prop: "relationName",
                label: "与本人关系",
                placeholder: "请选择关系",
                type: "select",
                func: this.openVisible,
                opt: [],
                readonly: true
            }
        ];
        const form = {};
        formData.forEach(item => {
            form[item.prop] = "";
            if (item.prop === "sex") {
                form[item.prop] = "1";
            } else {
                form[item.prop] = "";
            }
        });

        return {
            form,
            formData,
            pickerValue: "",
            popupVisible: false,
            options: [],
            radioValue: "",
            radioProp: ""
        };
    },
    mixins: [buttonMixin],
    computed: {
        ...mapGetters(["familyList", "openid"])
    },
    watch: {
        $route() {
            this.routerChange();
        }
    },
    methods: {
        async routerChange() {
            if (this.$route.name === "babyUpdate") {
                const id = this.$route.params.id;
                const current = this.familyList.find(item => item.id == id);
                Object.keys(this.form).forEach(key => {
                    if (key === "birthday") {
                        this.form[key] = current[key]
                            ? moment(current[key]).format("YYYY-MM-DD")
                            : "";
                    } else {
                        this.form[key] = current[key] ? current[key] : "";
                    }
                });
            }
        },
        // 选择出生日期
        openPicker() {
            if (!this.pickerValue) {
                if (this.form.birthday) {
                    this.pickerValue = this.form.birthday;
                } else {
                    this.pickerValue = "1990-05-05";
                }
            }
            this.$refs.picker.open();
        },

        openVisible(item) {
            // if (item.opt.length > 5) {
            //     this.$message({
            //         message: "可滑动选择",
            //         position: "bottom"
            //     });
            // }
            this.radioValue = "";
            this.options = item.opt;
            this.radioProp = item.prop;
            this.popupVisible = true;
        },
        handleConfirm(val) {
            this.form.birthday = moment(val).format("YYYY-MM-DD");
        },
        // 获取关系列表
        async getRelation() {
            const res = await getRelation();
            if (res.STATUS === "1") {
                const d = res.ITEMS;
                if (d && d.length > 0) {
                    const relationList = [];
                    d.forEach(item => {
                        relationList.push({
                            value: item.code,
                            label: item.name
                        });
                    });
                    const current = this.formData.find(
                        item => item.prop === "relationName"
                    );
                    current.opt = relationList;
                }
            }
        },
        // 获取出生日期
        idCardChange(item) {
            const value = this.form[item.prop];
            if (value) {
                if (!item.pattern.test(value)) {
                    this.$message(item.message);
                } else {
                    let birthday;
                    if (value.length == 15) {
                        birthday = "19" + value.substr(6, 6);
                    } else if (value.length == 18) {
                        birthday = value.substr(6, 8);
                    }
                    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
                    this.form.birthday = birthday;
                    this.pickerValue = birthday;
                }
            }
        },
        radioChange(val, options) {
            const name = options.find(item => item.value === val).label;
            this.form[this.radioProp] = name;
            this.popupVisible = false;
        },
        // 提交
        async handleSubmit() {
            const data = Object.assign({}, this.form);
            const flag = Object.keys(data).every(key => {
                const current = this.formData.find(item => item.prop === key);
                if (!current) {
                    return;
                }
                if (!data[key]) {
                    this.$message(current.placeholder);
                    return false;
                } else {
                    if (current.pattern && !current.pattern.test(data[key])) {
                        this.$message(current.message);
                        return false;
                    }
                }
                return true;
            });
            data.openid = this.openid;
            if (!flag) {
                return;
            }
            // 修改加上Id
            if (this.$route.name === "babyUpdate") {
                data.id = this.$route.params.id;
            }

            data.birthday = moment(data.birthday).format("YYYY-MM-DD HH:mm:ss");
            const relationList = this.formData.find(
                item => item.prop === "relationName"
            ).opt;
            data.relationCode = relationList.find(
                item => item.label === data.relationName
            ).value;
            this.$loading.open();
            const res = await userFamilyEdit(data);
            this.$loading.close();
            if (res.STATUS === "1") {
                // 重新设置家庭成员
                this.$loading.open();
                this.$store.dispatch("setFamilyList", this.openid).then(() => {
                    this.$loading.close();
                    let redirect = this.$route.query.redirect;
                    if (redirect) {
                        if (redirect.includes("servicePack")) {
                            redirect = redirect + "?popupVisible=true";
                        }
                        this.$router.push(redirect);
                    } else {
                        this.$router.go(-1);
                    }
                });
            }
        }
    },
    created() {
        this.getRelation();
        this.routerChange();
    }
};
</script>

<style lang="less" scoped>
.page {
    font-size: 0.3rem;
    .form {
        .form_item {
            height: 1rem;
            line-height: 1rem;
            padding: 0 0.3rem;
            .label {
                float: left;
            }
            .placeholder {
                color: #8b8b8b;
            }
            .right {
                overflow: hidden;
                input[type="text"] {
                    width: 100%;
                    text-align: right;
                }
                input[disabled],
                input:disabled {
                    background-color: #fff;
                }
                label {
                    position: relative;
                    padding: 0 0.3rem;
                    font-size: 0.28rem;
                }
                input[type="radio"] + label::before {
                    content: "";
                    width: 0.18rem;
                    height: 0.18rem;
                    border: 1px solid #ccc;
                    position: absolute;
                    left: -0.15rem;
                    top: 0rem;
                    border-radius: 50%;
                    padding: 0.04rem;
                }
                input[type="radio"]:checked + label::before {
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
