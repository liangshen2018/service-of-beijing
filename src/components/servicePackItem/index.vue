<template>
    <div class="service_pack_item">
        <ul class="product">
            <li v-for="(item,index) in list" :key="index" :style="{ 'background': 'url(' + require('@/assets/images/'+ item.img) + ') no-repeat','background-size': 'cover'}" @click="handleDetail(item.id)">
                <h3>{{item.title}}</h3>
                <p class="tip">{{item.tip}}</p>
                <p class="price">¥{{item.price}}</p>
                <p  class="name" v-if="item.name">{{item.name}}</p>
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
        li {
            height: 3.2rem;
            color: #fff;
            padding: 0.5rem 1.8rem 0.3rem 0.3rem;
            margin-bottom: 0.4rem;
            font-size: 0.4rem;
            h3 {
                font-size: 0.4rem;
            }
            .tip {
                padding: .1rem 0;
                font-size: 0.3rem;
            }
            .price {
                margin-top: 0.3rem;
            }
            .name {
                font-size: .45rem;
                padding: .3rem 0 ;
            }
        }
    }
}
</style>

