<template>
    <div class="page">
        <div class="page_hearder">
            <div class="address"><span>北京</span><span class="iconfont icon-jiantou"></span></div>
        </div>
        <div class="banner">
            <img src="@/assets/images/home.jpg" alt="">
        </div>
        <div class="introduce">
            <div class="header">北京颐美佳中医院</div>
            <p class="content">颐美佳专科医生团队覆盖耳鼻咽喉科、眼科、口腔科、皮肤科、中医科，设备器械种类齐全。由解放军总医院、同仁医生集团、第四军医大学等专业团队组成，并有301医院、协和医院等若干三甲医院的知名专家常年坐诊。</p>
            <ul class="section">
                <li v-for="(item,index) in sectionList" :key="index">
                    <div class="title">{{item.title}}</div>
                    <p class="two-cut">{{item.content}}</p>
                </li>
            </ul>
        </div>
        <h3>{{isHavePack? '我的服务包' : '服务包列表'}}</h3>
        <card-item :list="list" @handleDetail="handleDetail"></card-item>
    </div>
</template>

<script>
import list from "@/common/servicePack";
import CardItem from "@/components/CardItem/index";
export default {
    components: {
        CardItem
    },
    data() {
        return {
            isHavePack: false,
            list,
            sectionList: [
                {
                    title: "特色科室",
                    content: "耳鼻咽喉科、全科医疗科、眼科、口腔科"
                },
                {
                    title: "知名专家团队",
                    content: "若干三甲医院知名专家常年坐诊"
                },
                {
                    title: "先进设备",
                    content: "顶级先进仪器设备 为您提供更精确的测"
                },
                {
                    title: "轻松就诊环境",
                    content: "高级就诊环境，置身其中舒适放松"
                }
            ]
        };
    },
    methods: {
        handleDetail(id) {
            this.$router.push({
                name: "servicePackDetail",
                params: {
                    id
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    .page_hearder {
        padding: 0.4rem;
        .address {
            font-size: 0.4rem;
            font-weight: 500;
            color: #000;
            .icon-jiantou {
                font-size: .36rem;
            }
        }
    }
    .banner {
        height: 4rem;
        padding: 0 .4rem;
        img {
            border-radius: 8px;
            height: 4rem;;
        }
    }
    .introduce {
        padding: 0.4rem;
        .header {
            font-size: 0.4rem;
            font-weight: 500;
            color: #000;
            padding: 0.2rem 0;
        }
        .content {
            color: #8b8b8b;
            font-size: 0.28rem;
        }
        .section {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 0.4rem 0;
            li {
                width: 48%;
                box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
                border-radius: 2px;
                padding: 0.3rem 0.8rem 0.3rem 0.1rem;
                .title {
                    font-size: 0.32rem;
                    padding: 0.1rem 0;
                }
                p {
                    color: #8b8b8b;
                    font-size: 0.2rem;
                    line-height: 0.3rem;
                }
            }
        }
    }
    h3 {
        padding: 0.3rem;
        font-size: 0.4rem;
    }
}
</style>

