<template>
    <div class="service_pack_item">
        <ul class="product">
            <li class="content" v-for="(item,index) in list" :key="index" :style="{ 'background': 'url(' + require('@/'+ item.img) + ') no-repeat','background-size': 'cover'}" @click="handleDetail(item.id)">
                <div class="service" v-if="item.title">
                    <h3>{{item.title}}</h3>
                    <p class="tip">{{item.tip}}</p>
                    <p class="price">¥{{item.price}}</p>
                    <p class="name">{{item.name}}</p>
                </div>
                <p class="team" v-else-if="item.team">{{item.team}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            require: true
        }
    },
    methods: {
        handleDetail(id) {
            this.$emit("handleDetail", id);
        }
    }
};
</script>

<style lang="less" scoped>
.service_pack_item {
    .product {
        padding: 0.3rem;
        .content {
            height: 3.2rem;
            color: #fff;
            margin-bottom: 0.4rem;
            font-size: 0.4rem;
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            .service {
                padding-top: 0.3rem;
                padding-left: 0.3rem;
            }
            h3 {
                font-size: 0.4rem;
            }
            .tip {
                padding: 0.1rem 0;
                font-size: 0.3rem;
            }
            .price {
                margin-top: 0.3rem;
            }
            .name {
                font-size: 0.45rem;
                padding: 0.3rem 0;
            }
            .team {
                position: absolute;
                bottom: 0;
                height: 0.7rem;
                line-height: 0.7rem;
                width: 100%;
                padding-left: 0.2rem;
                font-size: .32rem;
                background-image: linear-gradient(
                    180deg,
                    rgba(0,0,0, 0) 0%,
                    rgba(0,0,0, .73) 100%,
                );
            }
        }
    }
}
</style>

