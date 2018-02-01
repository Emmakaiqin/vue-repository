<template>
  <transition name="food">
    <div class="food" v-show="showFlag">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
      name: "food",
      data(){
        return{
          showFlag:false,
        }
      },
      props:{
        food:{
          type:Object
        }
      },
      methods:{
        show(msg){
          this.showFlag=msg;
        }
      }
    }
</script>

<style scoped>
.food{position:fixed;left:0;top:0;bottom:48px;width:100%;height:100%;z-index:30;background-color:#fff;}
.food-enter-active,.food-leave-active{
  transition:all 0.5s;
  transform: translate3d(0,0,0);
}
.food-enter,.food-leave-to{
  transition:all 0.5s;
  transform: translate3d(-100%,0,0);
}
</style>
