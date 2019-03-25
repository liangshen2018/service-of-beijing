<template>
    <div class="team_self">
        <div class="team_item" v-for="(item,index) in list" :key="index">
            <div class="doctor_info" @click="handleCancel(item)">
                <div class="img"><img src="" alt=""></div>
                <div class="right">
                    <div><span class="name">李医生</span><span>主任医师</span></div>
                    <p>高新区南新卫生服务中心</p>
                    <!-- <div><span class="button">电话</span></div> -->
                </div>
            </div>
            <div class="introduce">
                <p class="adept two-cut">擅长：在诊治妇产科各种疑难病症、不孕不育、高危妊娠的诊断和处理、更年期疾病等方面积累了丰富丰富的的临床经验</p>
                <ul>
                    <li>评价: <span>5.0分</span></li>
                    <li>服务: <span>5000人</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array
        }
    },
    methods: {
        handleCancel(item) {
            this.$emit("handleCancel", item);
        }
    }
};
</script>

<style lang="less" scoped>
.team_self {
    padding: .5rem;
    .team_item {
        height: 4rem;
        padding: 0 0.2rem;
        background-color: #f9f9f9;
        margin-top: 0.7rem;
        border-radius: 4px;
        .doctor_info {
            height: 2rem;
            background-color: #fff;
            box-shadow: 0px 8px 30px 0px rgba(227, 227, 227, 0.37);
            border-radius: 4px;
            position: relative;
            top: -0.3rem;
            padding-top: 0.3rem;
            padding-left: 0.3rem;
            .img {
                width: 1.2rem;
                height: 1.2rem;
                float: left;
                vertical-align: middle;
                border-radius: 50%;
            }
            .right {
                padding-left: 0.2rem;
                overflow: hidden;
                font-size: 0.24rem;
                color: #aaaaaa;
                .name {
                    font-size: 0.32rem;
                    color: #000;
                    margin-right: 0.2rem;
                }
                p {
                    line-height: 0.6rem;
                }
                .button {
                    display: inline-block;
                    color: #fff;
                    font-size: 0.2rem;
                    padding: 0.05rem 0.3rem;
                    border-radius: 0.6rem;
                    background-color: #FF9A9B;
                }
            }
        }
        .introduce {
            font-size: 0.24rem;
            color: #aaaaaa;
            .adept {
                line-height: 0.36rem;
            }
            ul {
                margin-top: 0.5rem;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                li {
                    width: 33.3%;
                    text-align: center;
                    span {
                        color: #f49090;
                    }
                }
            }
        }
    }
}
</style>

