<template>
  <div class="count">
  </div>
</template>

<script>
  export default {
    name: 'count',
    data () {
      return {
        buyNum:0,//购买数据
        buyType:{},//购买类型
        versions:[],
        period:{},
        versionList:[
          {label:'客户版',value:0},
          {label:'代理商版',value:1},
          {label:'专家版',value:2}
        ],
        periodList:[

        ]
      }
    },
    props:{
    },
    computed:{
    },
    methods:{
      /*toggleDrop(){
        this.isDrop=!this.isDrop;
      },
      chooseSelection(index){
        this.nowIndex=index;
        this.isDrop=false;
        this.$emit("on-change",this.nowIndex)
      }*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
