<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" :class="{'height-light':totalCount>0}" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="fa fa-shopping-cart"></i>
            </div>
            <div v-if="totalCount>0" class="num">{{totalCount}}</div>
          </div>
          <div class="price">{{totalPrice}}元</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" v-if="totalPrice==0">￥{{minPrice}}元起送</div>
          <div class="pay enough" v-else-if="totalPrice>minPrice">去结算</div>
          <div class="pay" end-if="totalPrice<minPrice">还差￥{{minPrice-totalPrice}}元起送</div>
        </div>
      </div>
      <!--小球-->
      <div class="ball-container">
        <transition name="fade" v-for="(ball,index) in balls" :key="index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <!--小球 end-->
      <!--购物车物品显示与隐藏-->
      <transition name="fold" >
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <h1 class="empty" @click="empty">清空</h1>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price*food.count}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!--购物车物品显示与隐藏 end-->
    </div>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from "../cartcontrol/cartcontrol";

    export default {
      components: {
        Cartcontrol},
      name: "shopcart",
        /*props:['deliveryPrice','minPrice']*/
        data(){
          return{
            balls: [//小球个数
              {
                show: false
              },
              {
                show:  false
              },
              {
                show:  false
              },
              {
                show:  false
              },
              {
                show:  false
              }
            ],
            dropBalls:[],//已经下落的小球
            fold:true,//是否折叠
          }
        },
        props:{
          selectFoods:{//点餐选中物品
            type:Array,//数组
            default(){
              return [{
                price:3,
                count:0
              }];//默认返回空数组
            }
          },
          deliveryPrice:{type:Number,default:0},//配送费
          minPrice:{type:Number,default:0}//起送价
        },
        computed:{
          totalPrice(){//点单商品总价格
            let total=0;
            this.selectFoods.forEach((food)=>{
              total+=food.price*food.count;
            });
            return total;
          },
          totalCount(){//点单商品总社和
            let count=0;
            this.selectFoods.forEach((food)=>{
              count+=food.count;
            });
            return count;
          },
          listShow(){
            if(!this.totalCount){
              this.fold=true;
              return false;
            }
            let show=!this.fold
            if(show){
              this.$nextTick(()=>{
                if(!this.scroll){//如果没有scroll就new
                  this.scroll=new BScroll(this.$refs.listContent,{
                    click:true
                  });
                }else{this.scroll.refresh();}//如果有scroll就刷新
              })
            }
            return show;
          }
        },
        methods:{
          drop(el) {
            //触发一次事件就会将所有小球进行遍历
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) { //将false的小球放到dropBalls
                ball.show = true;
                ball.el = el; //设置小球的el属性为一个dom对象
                this.dropBalls.push(ball);
                return;
              }
            }
          },
          beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
            let count = this.balls.length;
            while (count--) {
              let ball = this.balls[count];
              if (ball.show) {
                let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
                el.style.display = ''; //清空display
                el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                el.style.transform = `translate3d(0,${y}px,0)`;
                //处理内层动画
                let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                inner.style.transform = `translate3d(${x}px,0,0)`;
              }
            }
          },
          enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight; //触发重绘html
            this.$nextTick(() => { //让动画效果异步执行,提高性能
              el.style.webkitTransform = 'translate3d(0,0,0)';
              el.style.transform = 'translate3d(0,0,0)';
              //处理内层动画
              let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
              inner.style.webkitTransform = 'translate3d(0,0,0)';
              inner.style.transform = 'translate3d(0,0,0)';
              el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
            });
          },
          afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
            let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
            if (ball) {
              ball.show = false;
              el.style.display = 'none'; //隐藏小球
            }
          },
          toggleList(){//购物车中物品折叠与显示
            if(!this.totalCount){
              return;
            }
            this.fold=!this.fold;
          },
          empty(){//清空购物车
            this.selectFoods.forEach((food)=>{
              food.count=0;
            })
          },
          hideList(){//点击这招隐藏显示的购物车
            this.fold=true;
          },
          pay(){//支付页面
            if(this.totalPrice<this.minPrice){
              return;
            }
            alert(`支付${this.totalPrice}元！`);
          }
        },
    }
</script>

<style scoped>
  .shopcart{position:fixed;bottom:0;width:100%;right:0;left:0;z-index:50;height:48px;}
  .shopcart .content{position:relative;display:flex;background-color:#141d27;height:100%;font-size:0;color:rgba(255,255,255,0.4);}
  .shopcart .content .content-left{flex:1;}
  .shopcart .content .content-left .logo-wrapper{display:inline-block;
    position: relative;top:-10px;margin:0 12px;padding:6px;height:56px;width:56px;
  box-sizing: border-box;vertical-align:top;border-radius:50%;
    background-color: #141d27}
  .shopcart .content .content-left .logo-wrapper .logo{height:100%;width:100%;border-radius:50%;background-color:#2b343c;text-align:center;}
  .shopcart .content .content-left .logo-wrapper .logo .fa-shopping-cart{color:#80858a;font-size:24px;line-height:44px;}
  .shopcart .content .content-left.height-light .logo-wrapper .logo{background-color:rgb(0,160,220);}
  .shopcart .content .content-left.height-light .logo-wrapper .logo .fa-shopping-cart{color:#fff;}
  .shopcart .content .content-left .logo-wrapper .num{
    position:absolute;top:0;right:0;width:24px;height:16px;
    line-height:16px;text-align:center;border-radius:16px;font-size:9px;
    font-weight:700;color:#fff;background-color:rgb(240,20,20);box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
  }
  .shopcart .content .content-left .price{display:inline-block;vertical-align:top;line-height:24px;margin-top:12px;
  padding-right:12px;box-sizing: border-box;border-right:1px solid rgba(255,255,255,0.1);font-size:16px;font-weight:700;}
  .shopcart .content .content-left.height-light .price{color:#fff;}
  .shopcart .content .content-left .desc{display:inline-block;vertical-align:top;line-height:24px;margin:12px 0 0 12px;font-size:10px;font-weight:700;}
  .shopcart .content .content-right{flex:0 0 105px;}
  .shopcart .content .content-right .pay{height:48px;line-height:48px;text-align:center;font-size:12px;font-weight:700;background-color:#2b343c;}
  .shopcart .content .content-right .pay.enough{color:#fff;background-color:#00b43c;}
  .shopcart .ball-container .ball{position:fixed;left:32px;bottom:22px;z-index:200;}
  .shopcart .ball-container .ball .inner{width:16px;height:16px;border-radius:50%;}
  .shopcart .ball-container .ball.drop-enter-active,.shopcart .ball-container .ball.drop-.ball-container .ball.drop-enter{
    transition: all .4s cubic-bezier(0.49,-0.29,-0.75,0.41);
  }
  .shopcart .ball-container .ball.drop-enter-active .inner,.shopcart .ball-container .ball.drop-enter .inner{
    background-color:rgb(0,160,220);
  }

  .shopcart .shopcart-list{position:absolute;bottom:48px;left:0;z-index:-1;width:100%;}
  .shopcart .shopcart-list.fold-enter-active,.shopcart .shopcart-list.fold-leave-active{
    transition:all 0.5s;
    transform: translate3d(0,0,0);
  }
  .shopcart .shopcart-list.fold-enter,.shopcart .shopcart-list.fold-leave-to{transform: translate3d(0,48px,0);}
  .shopcart .shopcart-list .list-header{height:40px;line-height:40px;padding:0 18px;background-color: #f3f5f7;border-bottom:2px solid rgba(7,17,27,0.1)}
  .shopcart .shopcart-list .list-header .title{float:left;font-size:12px;color:rgb(7,17,27);}
  .shopcart .shopcart-list .list-header .empty{float:right;font-size:12px;color:rgb(0,160,220);}
  .shopcart .shopcart-list .list-content{
    padding:0 18px;background-color:#fff;
    max-height:217px;overflow:hidden;
  }
  .shopcart .shopcart-list .list-content .food{position:relative;padding:12px 0;box-sizing: border-box;
  border-bottom:1px solid rgba(7,17,27,0.1);}
  .shopcart .shopcart-list .list-content .food .name{
    line-height:24px;font-size:14px;color:rgb(7,17,27);
  }
  .shopcart .shopcart-list .list-content .food .price{position:absolute;right:90px;bottom:12px;line-height:24px;font-size:14px;font-weight:700;color:rgb(240,20,20)}
  .shopcart .shopcart-list .list-content .food .cartcontrol-wrapper{
    position: absolute;right:0;bottom:6px;
  }
  .list-mask{position:fixed;top:0;left:0;width:100%;height:100%;z-index:40;background-color:rgba(7,17,27,0.6);}
  .list-mask.mask-enter-active,.list-mask.mask-leave-active{
    transition:all 0.5s;
    transform: translate3d(0,0,0);
  }
  .list-mask.mask-enter,.list-mask.mask-leave-to{transform: translate3d(0,48px,0);}
</style>
