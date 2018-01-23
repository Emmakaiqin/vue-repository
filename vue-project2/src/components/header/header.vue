<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="sellerMsg.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{sellerMsg.name}}</span>
        </div>
        <div class="description">
          {{sellerMsg.description}}/{{sellerMsg.deliveryTime}}分钟送达
        </div>
        <div v-if="sellerMsg.supports" class="support">
          <span class="icon" :class="classMap[sellerMsg.supports[0].type]"></span>
          <span class="text">{{sellerMsg.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="sellerMsg.supports" class="support-count" @click="showDetail">
        <span class="count">{{sellerMsg.supports.length}}个</span>
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{sellerMsg.bulletin}}</span><i @click="showDetail" class="fa fa-angle-right"></i>
    </div>
    <!--公告 end-->
    <!--背景-->
    <div class="background">
      <img :src="sellerMsg.avatar" width="100%" height="100%">
    </div>
    <!--背景 end-->
    <!--浮动层-->
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <!--标题-->
          <h1 class="name">{{sellerMsg.name}}</h1>
          <!--标题 end-->
          <!--评分-->
          <div class="star-wrapper">
            <star :size="48" :score="sellerMsg.score"></star>
          </div>
          <!--评分 end-->
          <!--文字-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="sellerMsg.supports">
            <li class="support-item" v-for="(item ,index) in sellerMsg.supports">
              <span class="icon" :class="classMap[sellerMsg.supports[index].type]"></span>
              <span class="text">{{sellerMsg.supports[index].description}}</span>
            </li>
          </ul>
          <!--文字 end-->
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="fa fa-times"></i>
      </div>
    </div>
    <!--浮动层 end-->
  </div>
</template>

<script>
  import star from  'components/star/star'
  export default {
    name: 'VHeader',
    components:{star},
    data () {
      return {
        detailShow:false
      }
    },
    created(){
      this.classMap=['decrease','discount','guarantee','invoice','special']
    },
    methods:{
      showDetail(){
        this.detailShow=true;
      },
      closeDetail(){
        this.detailShow=false;
      }
    },
    props:{
      sellerMsg:{
        default:{},
        type:Object
      }
    }
  }
</script>

<style scoped>
  .header{color:#fff;position:relative;background-color:rgba(7,17,27,0.5);overflow:hidden;}
  .header .content-wrapper{padding:24px 12px 18px 24px;font-size:0;position:relative;}
  .header .content-wrapper .avatar{display:inline-block}
  .header .content-wrapper .avatar img{border-radius:2px;}
  .header .content-wrapper .content{display:inline-block;margin-left:16px;}
  .header .content-wrapper .content .title{margin:2px 0 8px 0;}
  .header .content-wrapper .content .title .brand{
    display:inline-block;width:30px;height:18px;background-image: url("brand@2x.png");
    background-size:30px 18px;background-repeat:no-repeat;vertical-align:top;
  }
  .header .content-wrapper .content .support .text{font-size:12px;line-height:12px;}
  .header .content-wrapper .content .title .name{margin-left:6px;font-size:16px;line-height: 18px;font-weight:bold;}
  .header .content-wrapper .content .description{margin-bottom:10px;font-size:12px;line-height:12px;}
  .header .content-wrapper .content .support .icon{display:inline-block;width:12px;height:12px;margin-right:4px;background-size:12px;background-repeat:no-repeat;vertical-align:top}
  .header .content-wrapper .content .support .decrease{background-image: url("decrease_1@2x.png");}
  .header .content-wrapper .content .support .discount{background-image: url("discount_1@2x.png");}
  .header .content-wrapper .content .support .guarantee{background-image: url("guarantee_1@2x.png");}
  .header .content-wrapper .content .support .invoice{background-image: url("invoice_1@2x.png");}
  .header .content-wrapper .content .support .special{background-image: url("special_1@2x.png");}
  .header .content-wrapper .support-count{position:absolute;right:12px;bottom:18px;padding:0 8px;height:24px;line-height:24px;border-radius:14px;background-color:rgba(0,0,0,0.2);text-align:center;}
  .header .content-wrapper .support-count .count{font-size:10px;}
  .header .content-wrapper .support-count .fa-angle-right{font-size:10px;margin-left:5px;line-height:24px;}

  .header .bulletin-wrapper{background:rgba(27,27,27,0.5);padding:0 22px 0 12px;color:#fff;position:relative;height:28px;line-height:28px;white-space:nowrap;overflow: hidden;text-overflow:ellipsis; }
  .header .bulletin-wrapper .bulletin-title{display:inline-block;width:22px;height:12px;background-image:url("bulletin@2x.png");background-size:22px 12px;background-repeat: no-repeat;margin-top:8px;vertical-align:top;}
  .header .bulletin-wrapper .bulletin-text{font-size:12px;margin:0 4px;}
  .header .bulletin-wrapper .fa-angle-right{font-size:12px;position:absolute;right:10px;top:8px;}
  /*--背景--*/
  .header .background{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;filter: blur(10px)}
  /*--背景 end--*/
  /*--浮动层--*/
  .header .detail{position:fixed;z-index:100;width:100%;
    height:100%;overflow:auto;background-color:rgba(7,17,27,0.8);top:0;left:0;}
  .header .detail .detail-wrapper{min-height:100%;width:100%;}
  .header .detail .detail-wrapper .detail-main{margin-top:64px;padding-bottom:64px;}
  .header .detail .detail-wrapper .detail-main .name{line-height:16px;font-size:16px;text-align:center;font-weight:700;}
  .header .detail .detail-wrapper .detail-main .star-wrapper{margin-top:18px;text-align:center;padding:2px 0;}
  .header .detail .detail-wrapper .detail-main .title{display:flex;width:80%;margin:28px auto 24px auto;}
  .header .detail .detail-wrapper .detail-main .title .line{flex:1;position:relative;top:-8px;border-bottom:1px solid rgba(255,255,255,0.2);}
  .header .detail .detail-wrapper .detail-main .title .text{padding:0 12px;font-size:14px;font-weight:700;}
  .header .detail .detail-wrapper .detail-main .supports{width:80%;margin:0 auto;}
  .header .detail .detail-wrapper .detail-main .support-item{padding:0 12px;margin-bottom:12px;font-szie:0;line-height:16px;}
  .header .detail .detail-wrapper .detail-main .support-item:last-child{margin-bottom:0;}
  .header .detail .detail-wrapper .detail-main .support-item .icon{display:inline-block;width:16px;height:16px;vertical-align:top;margin-right:6px;background-size:16px 16px;background-repeat:no-repeat;}
  .header .detail .detail-wrapper .detail-main .support-item .icon.decrease{background-image: url("decrease_2@2x.png");}
  .header .detail .detail-wrapper .detail-main .support-item .icon.discount{background-image: url("discount_2@2x.png");}
  .header .detail .detail-wrapper .detail-main .support-item .icon.guarantee{background-image: url("guarantee_2@2x.png");}
  .header .detail .detail-wrapper .detail-main .support-item .icon.invoice{background-image: url("invoice_2@2x.png");}
  .header .detail .detail-wrapper .detail-main .support-item .icon.special{background-image: url("special_2@2x.png");}
  .header .detail .detail-wrapper .detail-main .support-item .text{font-size:12px;}
  .header .detail .detail-close{position:relative;height:32px;width:32px;margin:-64px  auto 0 auto;clear:both;font-size:32px;}
  /*--浮动层 end--*/
  @media (min-device-pixel-ratio:3){
    .header .content-wrapper .content .title .brand{background-image: url("brand@3x.png");}
    .header .content-wrapper .content .support .decrease{background-image: url("decrease_1@3x.png");}
    .header .content-wrapper .content .support .discount{background-image: url("discount_1@3x.png");}
    .header .content-wrapper .content .support .guarantee{background-image: url("guarantee_1@3x.png");}
    .header .content-wrapper .content .support .invoice{background-image: url("invoice_1@3x.png");}
    .header .content-wrapper .content .support .special{background-image: url("special_1@3x.png");}
    .header .bulletin-wrapper .bulletin-title{background-image:url("bulletin@3x.png");}

    .header .detail .detail-wrapper .detail-main .support-item .icon.decrease{background-image: url("decrease_2@3x.png");}
    .header .detail .detail-wrapper .detail-main .support-item .icon.discount{background-image: url("discount_2@3x.png");}
    .header .detail .detail-wrapper .detail-main .support-item .icon.guarantee{background-image: url("guarantee_2@3x.png");}
    .header .detail .detail-wrapper .detail-main .support-item .icon.invoice{background-image: url("invoice_2@3x.png");}
    .header .detail .detail-wrapper .detail-main .support-item .icon.special{background-image: url("special_2@3x.png");}
  }
</style>
