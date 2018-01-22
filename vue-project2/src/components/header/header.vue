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
          <span class="icon"></span>
          <span class="text">{{sellerMsg.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: 'VHeader',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
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
  .header{color:#fff;background-color:#000}
  .header .content-wrapper{padding:24px 12px 18px 24px;font-size:0}
  .header .content-wrapper .avatar{display:inline-block}
  .header .content-wrapper .avatar img{border-radius:2px;}
  .header .content-wrapper .content{display:inline-block;font-size:14px;margin-left:16px;}
  .header .content-wrapper .content .title{margin:2px 0 8px 0;}
  .header .content-wrapper .content .title .brand{
    display:inline-block;width:30px;height:18px;background-image: url("./brand@2x.png");
    background-size:30px 18px;background-repeat:no-repeat;vertical-align:top;
  }
  .header .content-wrapper .content .title .name{margin-left:6px;font-size:16px;line-height: 18px;font-weight:bold;}
  .header .content-wrapper .content .description{margin-bottom:10px;font-size:12px;line-height:12px;}
  .header .content-wrapper .content .support{}
  .header .content-wrapper .content .support .icon{display:inline-block;width:12px;height:12px;margin-right:4px;background-size:12px;background-repeat:no-repeat}
  .header .content-wrapper .content .support .decrease{background-image: url("./decrease_1@2x.png");}
  .header .content-wrapper .content .support .discount{background-image: url("./discount_1@2x.png");}
  .header .content-wrapper .content .support .guarantee{background-image: url("./guarantee_1@2x.png");}
  .header .content-wrapper .content .support .invoice{background-image: url("./invoice_1@2x.png");}
  .header .content-wrapper .content .support .special{background-image: url("./special_1@2x.png");}
  @media (min-device-pixel-ratio:3){
    .header .content-wrapper .content .title .brand{background-image: url("./brand@3x.png");}
    .header .content-wrapper .content .support .decrease{background-image: url("./decrease_1@3x.png");}
    .header .content-wrapper .content .support .discount{background-image: url("./discount_1@3x.png");}
    .header .content-wrapper .content .support .guarantee{background-image: url("./guarantee_1@3x.png");}
    .header .content-wrapper .content .support .invoice{background-image: url("./invoice_1@3x.png");}
    .header .content-wrapper .content .support .special{background-image: url("./special_1@3x.png");}
  }
</style>
