<template>
    <div class="page">
        <div class="form">
            <div class="form_item">
                <div class="label">姓名</div>
                <div class="right">
                    <input type="text" ref="text" placeholder="请输入宝贝姓名" v-model="form.name">
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
                <div class="label">身份证</div>
                <div class="right">
                    <input type="text" placeholder="请输入身份证号" v-model="form.idCard">
                </div>
            </div>
            <div class="form_item">
                <div class="label">出生日期</div>
                <div class="right" @click="openPicker">
                    <input type="text" placeholder="请选择出生日期" readonly v-model="form.birthday">
                </div>
            </div>
            <div class="form_item">
                <div class="label">与本人关系</div>
                <div class="right">
                    <input type="text" placeholder="请选择与本人关系" @click="popupVisible=true" readonly v-model="form.relationName">
                </div>
            </div>
        </div>
        <div class="btn" @click="handleSubmit">提交</div>
        <mt-datetime-picker ref="picker" type="date" :startDate="new Date('1990-10-10')" :endDate="new Date()" @confirm="handleConfirm" v-model="pickerValue">
        </mt-datetime-picker>
        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <div class="content">
                <mt-radio align="right" v-model="form.relationCode" @change="relationCodeChange(form.relationCode)" :options="relationList">
                </mt-radio>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import moment from "moment";
import { userFamilyEdit } from "@/api/user";
import { getRelation } from "@/api/calalog";
export default {
    data() {
        return {
            form: {
                name: "",
                sex: "1",
                birthday: "",
                idCard: "",
                relationName: "",
                relationCode:''
            },
            pickerValue: "",
            popupVisible: false,
            relationList: []
        };
    },
    computed: {
        openid() {
            return this.$store.getters.openid;
        }
    },
    methods: {
        openPicker() {
            this.$refs.picker.open();
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
                            label: item.name,
                        });
                    });
                    this.relationList = relationList;
                }
            }
        },
        relationCodeChange(val) {
            const name = this.relationList.find(item => item.value === val).label
            this.form.relationName = name
            this.popupVisible = false
        },
        // 提交
        async handleSubmit() {
            const data = Object.assign({}, this.form);
            const valit = [
                {
                    prop: "name",
                    pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
                    message: "姓名输入不合法",
                    mes: "请输入宝贝姓名"
                },
                {
                    prop: "idCard",
                    pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                    message: "请输入正确的身份证",
                    mes: "请输入身份证"
                },
                {
                    prop: "sex",
                    mes: "请选择性别"
                },
                {
                    prop: "birthday",
                    mes: "请选择出生日期"
                },
                {
                    prop: "relationName",
                    mes: "请选择关系"
                },
                {
                    prop: "relationCode",
                    mes: "请选择关系"
                }

            ];
            const flag = Object.keys(data).every(key => {
                const current = valit.find(item => item.prop === key);
                if(!current) {
                    return
                }
                if (!data[key]) {
                    this.$message(current.mes);
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
            data.birthday = moment(data.birthday).format("YYYY-MM-DD HH:mm:ss");
            this.$loading.open()
            const res = await userFamilyEdit(data);
            this.$loading.close()
            if(res.STATUS === '1') {
                this.$message('添加成功')
                this.$router.push(this.$route.query.redirect)
            }
        }
    },
    created() {
        this.getRelation();
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
