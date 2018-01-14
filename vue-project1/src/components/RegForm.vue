<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <span class="error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">注册</a>
        </div>
        <span class="error">{{errorText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reg-form',
    data () {
      return {
        username:'',
        errorText:''
      }
    },
    props:{
    },
    computed:{
      userErrors(){
        let errorText,status;
        if(this.username!='Emma'){
          status=false;
          errorText='请输入正确的用户名';
        }else {
          status=true;
          errorText='';
        }
        return{
          status,
          errorText
        }
      }
    },
    methods:{
      onLogin(){
        if (!this.userErrors.status) {
          this.errorText = '用户名错误';
        } else {
          this.errorText = '';
          this.$http.get('api/login').then((res) => {
            this.$emit('has-reg', res.data);
          }, (error) => {
            console.log(error);
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
