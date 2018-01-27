<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" @click="selectMenu(index,$event)" class="menu-item" :class="{'current':currentIndex===index}">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img :src="food.image" width="57px" height="57px">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra"><span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';//引入滑动插件
    export default {
      props:{
          seller:{
            type:Object
          }
      },
      data(){
        return{
          goods:[],
          listHeight:[],//食品菜单区间高度
          scrollY:0
        }
      },
      computed:{
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
              return i;
            }
          }
        }
      },
      methods:{
        _initScroll(){//上下拉滚动
          this.menuScroll=new BScroll(this.$refs.menuWrapper,{click:true});
          this.foodsScroll=new BScroll(this.$refs.foodWrapper,{probeType:3});
          this.foodsScroll.on("scroll",(pos)=>{
            this.scrollY=Math.abs(Math.round(pos.y));
          })
        },
        _calculateHeight(){//计算滚动高度
          let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i];
            height+=item.clientHeight;
            this.listHeight.push(height);
          }
        },
        selectMenu(index,event){//菜单选择
          if(!event._constructed){//禁止点击一次出发两次点击事件
            return ;
          }
          let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
          let el=foodList[index];
          this.foodsScroll.scrollToElement(el,300);
        }
      },
      created(){
        this.classMap=['decrease','discount','guarantee','invoice','special']
      },
      mounted(){
        this.$http.get('/api/goods').then(
          (response)=>{this.goods=response.body;
         this.$nextTick(()=>{//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
            this._initScroll();
            this._calculateHeight();
          });
         },
          (err)=>{console.log(err);})
      }
    }
</script>

<style scoped>
  .goods{position:absolute;top:177px;bottom:46px;width:100%;
    display:flex;overflow:hidden;}
  .goods .menu-wrapper{flex:0 0 80px;width:80px;background-color:#F3F5F7;}
  .goods .menu-wrapper .menu-item{display:table;height:54px;width:56px;line-height:14px;padding:0 12px;border-bottom:1px solid rgba(7,17,27,.2);}
  .goods .menu-wrapper .current{background-color:#fff;font-weight:700;margin-top:-1px;z-index:10;}
  .goods .menu-wrapper .menu-item .text{font-size:12px;vertical-align:middle;display:table-cell;width:56px;line-height:14px;}
  .goods .menu-wrapper .current .text{border:none;}
  .goods .menu-wrapper .menu-item .icon{display:inline-block;width:12px;height:12px;vertical-align:top;margin-right:2px;background-size:12px 12px;background-repeat:no-repeat;}
  .goods .menu-wrapper .menu-item .icon.decrease{background-image: url("decrease_3@2x.png");}
  .goods .menu-wrapper .menu-item .icon.discount{background-image: url("discount_3@2x.png");}
  .goods .menu-wrapper .menu-item .icon.guarantee{background-image: url("guarantee_3@2x.png");}
  .goods .menu-wrapper .menu-item .icon.invoice{background-image: url("invoice_3@2x.png");}
  .goods .menu-wrapper .menu-item .icon.special{background-image: url("special_3@2x.png");}
  .goods .foods-wrapper{flex:1;}
  .goods .foods-wrapper .title{padding-left:14px;height:26px;line-height:24px;border-left:2px solid #d9dde1;font-size:12px;color:rgb(147,153,159);background-color: #F3F5F7;}
  .goods .foods-wrapper .food-item{
    display:flex;margin:18px;border-bottom:1px solid
    rgba(7,17,27,0.1);padding-bottom:18px;}
  .goods .foods-wrapper .food-item:last-child{border:none;margin-bottom:0;}
  .goods .foods-wrapper .food-item .icon{flex:0 0 57px;margin-right:10px;}
  .goods .foods-wrapper .food-item .content{flex:1;}
  .goods .foods-wrapper .food-item .content .name{font-size:14px;margin:2px 0 8px 0;line-height:14px;height:14px;color:rgb(7,17,27);}
  .goods .foods-wrapper .food-item .content .desc,  .goods .foods-wrapper .food-item .content .extra{line-height:10px;font-size:10px;color:rgb(147,153,159);}
  .goods .foods-wrapper .food-item .content .desc{margin-bottom:8px;line-height:12px;}
  .goods .foods-wrapper .food-item .content .extra .count{margin-right:12px;}
  .goods .foods-wrapper .food-item .content .price{line-height:24px;font-weight:700;}
  .goods .foods-wrapper .food-item .content .price .now{margin-right:8px;font-size:14px;color:rgb(240,20,20);}
  .goods .foods-wrapper .food-item .content .price .old{font-size:10px;color:rgb(147,153,159);text-decoration:line-through;}
</style>
