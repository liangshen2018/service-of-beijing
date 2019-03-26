<template>
    <div class="page">
        <div class="page_header">
        </div>
        <div class="img"><img :src="require('@/'+data.headImg)" alt=""></div>
        <div class="name">{{data.teamName}}</div>
        <div class="member clearfix" v-for="(item,index) in data.memberData" :key="index">
            <div class="left"><img :src="require('@/'+item.img)" alt=""></div>
            <div class="right">
                <div class="member_name clearfix">
                    <span class="fl">{{item.name}}</span>
                    <div class="phone fr" @click="dialing">
                        <span>拨打电话</span>
                        <img src="@/assets/team/phone.png" alt="">
                    </div>
                </div>
                <p class="content" v-for="(child,idx) in item.content" :key="idx">{{child}}</p>
            </div>
        </div>
        <div class="specialist">
            <img src="@/assets/team/specialist.jpg" alt="">
        </div>
        <div class="equity">
            <img :src="require('@/'+equityImg)" alt="">
        </div>
        <div class="btn" @click="handleSign">签约家庭医生</div>
    </div>
</template>

<script>
import member from "./tpl/member";
import { mapGetters } from "vuex";
import { teamSign } from "@/api/user";
export default {
    data() {
        return {
            data:{},
        }
    },
    methods:{
       dialing() {
            window.location.href = "tel:" + 10086;
       },
       async handleSign() {
           const data = {
               orderId:this.orderId,
               packId:this.equityId,
               teamId:this.$route.params.id
           }
          const res = await teamSign(data)
          if(res.STATUS === '1') {
              const name = data.memberData[0].name.split(' ')
              this.$router.push({
                  name:'contractSuccess',
                  query: {
                      name,
                  }
              })
          }
       }
    },
    computed:{
      ...mapGetters(['equityId','openid','orderId']),
      equityImg() {
          let equityId = this.equityId
          if(!equityId){
              equityId = 1
          }
          return `assets/equity/${equityId}.jpg`
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
    padding-bottom: 1rem;
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
        padding: 0.5rem 0.3rem;
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
                .phone {
                    font-size: 0.28rem;
                    color: #00c000;
                    img {
                        display: inline-block;
                        width: 0.6rem;
                        vertical-align: middle;
                    }
                }
            }
            p {
                font-size: 0.28rem;
                color: #a3a3a3;
                line-height: 0.36rem;
            }
        }
    }
}
</style>

