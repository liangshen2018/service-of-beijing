<template>
    <div class="page">
        <div class="form">
            <div class="form_item" v-for="(item,index) in formData" :key="index">
                <div class="label">{{item.label}}</div>
                <template v-if="item.type === 'text'">
                    <div class="right" @click="item.func?item.func(item):{}">
                        <input type="text" :placeholder="item.placeholder" :readonly="item.readonly" v-model="form[item.prop]">
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
        <div class="btn" @click="handleSubmit">提交</div>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date('1990-10-10')" :endDate="new Date()" @confirm="handleConfirm" v-model="pickerValue">
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
                pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
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
                placeholder: "请输入出生日期",
                type: "text",
                func: this.openPicker,
                readonly: true
            },
            {
                prop: "relationName",
                label: "与本人关系",
                placeholder: "请选择关系",
                type: "text",
                func: this.openVisible,
                opt: [],
                readonly: true
            },
            {
                prop: "bloodType",
                label: "ABO血型",
                placeholder: "请选择ABO血型",
                type: "text",
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
                type: "text",
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
            }
        ];
        const form = {};
        formData.forEach(item => {
            form[item.prop] = "";
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
            this.$refs.picker.open();
        },
        openVisible(item) {
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
            if (res.STATUS === "1") {
                // 重新设置家庭成员
                this.$store.dispatch("setFamilyList", this.openid).then(() => {
                    this.$loading.close();
                    this.$router.push(this.$route.query.redirect);
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
