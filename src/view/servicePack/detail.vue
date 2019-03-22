<template>
    <div class="page">
        <template v-if="imgList.length > 0">
            <img :src="require('@/'+item.img)" alt="" v-for="(item,index) in imgList" :key="index">
        </template>
        <div class="purchase">
            <h2>购买须知</h2>
            <p>1:购买须知暂无内容</p>
        </div>
        <div class="btn" @click="popupVisible = true">立即购买</div>
        <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
            <div class="content">
                <h3>选择宝贝</h3>
                <template v-if="options.length > 0">
                    <mt-radio align="right" v-model="babyInfo" :options="options">
                    </mt-radio>
                </template>
                <div v-else class="tip">暂无宝贝</div>
                <div class="empty" style="height:1rem"></div>
                <div class="btn" @click="handleBabyAdd">添加宝贝</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import list from "./tpl/img";
export default {
    data() {
        return {
            list,
            imgList: [],
            popupVisible: false,
            babyInfo: "",
            value: [],
            options: [
                { label: "张三", value: "1" },
                { label: "张三", value: "2" }
            ]
        };
    },
    watch: {
        babyInfo() {
            this.popupVisible = false;
            const id = this.$route.params.id;
            setTimeout(() => {
                this.$router.push({
                    name: "payment",
                    params: {
                        id
                    }
                });
            }, 500);
        }
    },
    methods: {
        //  获取详情
        getDetailInfo() {
            const id = this.$route.params.id;
            const current = this.list.find(item => item.id == id);
            this.imgList = current.imgList;
        },
        handleBabyAdd() {
            this.$router.push({
                name: "babyAdd"
            });
        }
    },
    mounted() {
        this.getDetailInfo();
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom: 1rem;
    .btn {
        position: absolute;
        bottom: 0;
    }
    .purchase {
        h2 {
            font-size: 0.4rem;
            padding-left: 0.4rem;
            margin-top: 1rem;
        }
        p {
            font-size: 0.3rem;
            color: #757575;
            padding-left: 0.4rem;
            margin: 0.4rem 0 1rem 0;
        }
    }
    .position {
        position: fixed;
        bottom: 0;
    }
    .content {
        font-size: 0.32rem;
        h3 {
            text-align: center;
            height: 1rem;
            line-height: 1rem;
            border-bottom: 1px solid #f6f6f6;
        }
        li {
            padding: 0.2rem 0.2rem 0.2rem 0.4rem;
        }
        .age {
            color: #757575;
            font-size: 0.24rem;
            margin-top: 0.1rem;
        }
        .tip {
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            color: #757575;
        }
    }
    /deep/ .mint-radio-input:checked + .mint-radio-core {
        background-color: #ff7b72;
        border-color: #ff7b72;
    }
}
</style>

