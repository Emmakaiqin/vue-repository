<template>
  <div class="order-wrap">
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection  :selections="products" @on-change="productChange">
        </v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker format="YYYY-MM-DD" @change="changeStartTime"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker format="YYYY-MM-DD" @change="changeEndTime"></v-date-picker>
      </div>
      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads"
          @click="changeOrderType(head)"
          :class="{active:head.active}">{{head.label}}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{item[head.key]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import VSelection from '../base/Selection.vue'
  import VDatePicker from '../base/DatePicker'
  import _ from 'lodash'
  export default {
    data(){
      return{
        query:'',
        productId:0,
        startTime:'',
        endTime:'',
        products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
        ],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],
        currentOrder: 'asc',
        tableData: []
      }
    },
    components:{VSelection,VDatePicker},
    methods:{
      productChange(obj){
        this.productId=obj.value;
        this.getTableDate();
      },
      changeStartTime(date){
        this.startTime=date;
        this.getTableDate();
      },
      changeEndTime(date){
        this.endTime=date;
        this.getTableDate();
      },
      changeOrderType(headItem){
        this.tableHeads.map((item)=>{//map数组映射，原数组变成新的数组
            item.active=false;
            return item;
        });
        headItem.active=true;
        if(this.currentOrder==='asc'){
          this.currentOrder='desc';
        }else if(this.currentOrder==='desc'){
          this.currentOrder='asc';
        }
        this.tableData=_.orderBy(this.tableData,headItem.key,this.currentOrder);
      },
      getTableDate(){
        let reqParam={
          query:this.query,
          productId:this.productId,
          startTime:this.startTime,
          endTime:this.endTime
        };
        this.$http.post('/api/getOrderList',reqParam)
        .then(
          (res)=>{
            this.tableData=res.data.list;
          },
          (err)=>{
            console.log(err);
          }
        )
      },
    },
    mounted(){
      this.getTableDate()
    },
    watch:{
      query(){
        this.getTableDate();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }
  .order-list-option:first-child {
    padding-left: 0;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
</style>
