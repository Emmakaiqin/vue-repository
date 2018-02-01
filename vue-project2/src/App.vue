<template>
  <div class="app">
    <v-header :sellerMsg="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <div class="content">
      content
    </div>
  </div>
</template>

<script>
  import VHeader from './components/header/header'
  export default {
    name: 'App',
    data() {//数据
      return{
        seller:{}
      };
    },
    created(){//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
      this.$http.get('/api/seller').then(
        (res)=>{
          this.seller=res.body;
          console.log(this.seller);
          },
        (err)=>{console.log(err)}
        )
    },
    methods:{//方法

    },
    computed:{

    },
    components:{//模板
      VHeader,
    }
  }
</script>

<style>
  .app .tab{display: flex;width: 100%;height:40px;line-height:40px;border-bottom:1px solid rgba(7,17,27,0.1);position:relative;}
  .app .tab .tab-item{flex:1;text-align: center;}
  .app .tab .tab-item a{display: block;font-size:14px;color:rgb(77,85,93)}
  .app .tab .tab-item a.router-link-active{color:rgb(240,20,20)}
</style>
