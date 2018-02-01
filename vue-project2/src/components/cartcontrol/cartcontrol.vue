<template>
    <div class="cartcontrol">
      <transition name="decrease">
        <div class="cart-decrease fa fa-minus-circle" v-show="food.count>0"  @click="decreaseCart($event)"></div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add fa fa-plus-circle" @click="addCart($event)"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      props:{
          food:{
            type:Object
          }
      },
      methods:{
        addCart(event){//增加按钮
          if(!event._constructed){//禁止点击一次出发两次点击事件
            return ;}
          if(!this.food.count){
            Vue.set(this.food,'count',1);
          }else{
            this.food.count++;
          }
          //点击加号事件
          this.$emit('cart-add', event.target);//将元素传给父组件
        },
        decreaseCart(event){//减少按钮
          if(!event._constructed){//禁止点击一次出发两次点击事件
            return ;}
          if(this.food.count>0){this.food.count--;}
        }
      }
    }
</script>

<style scoped>
.cartcontrol{font-size:0;}
.cartcontrol .fa{display:inline-block;padding:6px;font-size:24px;line-height:24px;color:rgb(0,160,220);vertical-align:middle}
.cartcontrol .cart-count{display:inline-block;font-size:10px;line-height:24px;vertical-align:middle;width:12px;color:rgb(147,153,159);text-align:center;}
.cartcontrol .decrease-enter-active,.cartcontrol .decrease-leave-active{
  transition: all .4s linear;
  transform:translate3d(0,0,0) rotate(0deg);
}
.cartcontrol .decrease-enter,.cartcontrol .decrease-leave-to {
  transform:translate3d(24px,0,0) rotate(180deg);
  opacity: 0;
}
</style>
