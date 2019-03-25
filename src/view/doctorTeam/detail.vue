<template>
    <div class="page">
        <div class="page_header">
        </div>
        <div class="img"><img :src="require('@/'+data.headImg)"  alt=""></div>
        <div class="name">{{data.teamName}}</div>
        <div class="member clearfix" v-for="(item,index) in data.memberData" :key="index">
            <div class="left"><img :src="require('@/'+item.img)"   alt=""></div>
            <div class="right">
                <div class="member_name">{{item.name}}</div>
                <p class="content" v-for="(child,idx) in item.content" :key="idx">{{child}}</p>
            </div>
        </div>
        <div class="btn">签约家庭医生</div>
    </div>
</template>

<script>
import member from "./tpl/member";
export default {
    data() {
        return {
            data:{}
        }
    },
    created() {
        const id = this.$route.params.id
        const data = member.find(item => item.id == id)
        this.data = data
    }
};
</script>

<style lang="less" scoped>
.page {
    padding-bottom:1rem;
    .page_header {
        height: 2.6rem;
        background: linear-gradient(
            180deg,
            rgba(81, 136, 166, 1) 0%,
            #fff 100%
        );
    }
    .img {
        margin-top: -1.5rem;
        padding: 0 0.5rem;
        img {
            border-radius: 4px;
        }
    }
    .name {
        font-size: 0.36rem;
        text-align: center;
        padding: 0.5rem 0;
    }
    .member {

        padding: .5rem 0.3rem;
        .left {
            width: 1.2rem;
            height: 1.2rem;
            float: left;
            border-radius: 50%;
            overflow: hidden;
        }
        .right {
            padding-left: 0.2rem;
            font-size: 0.36rem;
            overflow: hidden;
            .member_name {
                margin-bottom: 0.2rem;
            }
            p {
                font-size: 0.28rem;
                color: #a3a3a3;
                line-height: 0.36rem;
            }
        }
    }
    .btn {
       position: absolute;
       bottom: 0;
    }
}
</style>

