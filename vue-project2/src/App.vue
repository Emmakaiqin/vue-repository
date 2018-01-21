<template>
  <div class="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      content
    </div>
  </div>
</template>

<script>
import VHeader from './components/header/header'
export default {
  name: 'App',
  components:{
    VHeader,
  }
}
</script>

<style>
  .app .tab{display: flex;width: 100%;height:40px;line-height:40px;}
  .app .tab .tab-item{flex:1;text-align: center;}
</style>
