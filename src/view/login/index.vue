<template>
    <div class="page">
        <div class="page_info">
            <div class="input">
                <input placeholder="请输入手机号" type='number' pattern="[0-9]*" v-model="form.phone">
                <input v-if="codeShow" placeholder="请输入输入验证码" type='number' @change="codeChange" pattern="[0-9]*" v-model="form.code">
            </div>
            <div class="button">
                <span @click="handleCode" :class="{'enter':isEnter}">{{btnTxt}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                phone: "",
                code: ""
            },
            btnTxt: "获取验证码",
            show: true,
            count: "",
            timer: null,
            codeVisib: false
        };
    },
    methods: {
        //   登陆
        codeChange() {
            this.$router.back(-1);
        },
        // 获取验证码定时
        handleCode() {
            if (this.isEnter) {
                const TIME_COUNT = 60;
                this.btnTxt = TIME_COUNT + "s后重新获取";
                this.codeVisib = true;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                            this.btnTxt = this.count + "s后重新获取";
                        } else {
                            this.btnTxt = "获取验证码";
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
            }
        }
    },
    computed: {
        isEnter() {
            if (/^1[34578]\d{9}$/.test(this.form.phone) && this.show) {
                return true;
            } else {
                return false;
            }
        },
        codeShow() {
            if (/^1[34578]\d{9}$/.test(this.form.phone) && this.codeVisib) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    .page_info {
        text-align: center;
        padding: 0 0.5rem;
        margin-top: 3rem;
        .input {
            input {
                width: 100%;
                height: 1rem;
                border-bottom: 1px solid #f6f6f6;
                text-align: center;
            }
        }
        .button {
            margin-top: 0.5rem;
            span {
                padding: 0.2rem 0.4rem;
                border: 1px solid #ccc;
                border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
                &.enter {
                    color: #fff;
                    border: none;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 170, 151, 1) 0%,
                        rgba(255, 134, 160, 1) 100%
                    );
                }
            }
        }
    }
}
</style>
