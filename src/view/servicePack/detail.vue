<template>
    <div class="page">
        <!-- `~/assets/images/id_${$route.params.id}/${index+1}.png` -->
        <template v-if="imgList.length > 0" >
          <img :src="require('@/'+item.img)" alt="" v-for="(item,index) in imgList" :key="index">
        </template>
        <div class="purchase">
            <h2>购买须知</h2>
            <p>1:购买须知暂无内容</p>
        </div>
      <div class="btn" @click="popupVisible = true">立即购买</div>
      <mt-popup
        v-model="popupVisible"
        position="bottom" style="width:100%">
          <div class="content">
              <h3>选择宝贝</h3>
               <template v-if="options.length > 0">
                    <mt-radio
                        align="right"
                        v-model="babyInfo"
                        :options="options">
                    </mt-radio>
               </template>
               <div v-else class="tip">暂无宝贝</div>
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
          imgList:[],
          popupVisible:false,
          babyInfo:'',
          options:[
              {
                   label: '烈额(男,2岁)',
                   value: '烈额'
              },
              {
                   label: '2131',
                   value: '2'
              }
          ]
      }
   },
   watch:{
      babyInfo() {
         this.popupVisible = false
         const id = this.$route.params.id
         this.$router.push({
             name:'payment',
             params:{
                 id
             }
         })
      }
   },
   methods:{
    //  获取详情
    getDetailInfo() {
        const id = this.$route.params.id
        const current = this.list.find(item => item.id == id)
        this.imgList = current.imgList
    },
    handleBabyAdd() {

        this.$router.push({
            name:'babyAdd'
        })
    }
   },
   mounted(){
     this.getDetailInfo()
   }
}
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
           font-size: .4rem;
           padding-left: .4rem;
           margin-top: 1rem
       }
       p {
           font-size: .3rem;
           color:#757575;
           padding-left: .4rem;
           margin: .4rem 0 1rem 0;
       }
   }
   .position {
       position: fixed;
       bottom: 0;
   }
   .content {
        font-size: .32rem;
       h3 {
           text-align: center;
           height: 1rem;
           line-height: 1rem;
           border-bottom: 1px solid #F6F6F6;
       }
       li {
           padding: .2rem .2rem .2rem .4rem;
       }
       .age {
           color: #757575;
           font-size: .24rem;
           margin-top: .1rem;

       }
       .tip {
           height: 2rem;
           line-height: 2rem;
           text-align: center;
           color: #757575;
       }
   }
   /deep/ .mint-radio-input:checked + .mint-radio-core {
         background-color: #FF7B72;
         border-color: #FF7B72
   }
}
</style>

