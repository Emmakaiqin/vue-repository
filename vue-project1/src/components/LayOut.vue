<template>
  <div id="lay-out">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path:'/'}" title="首页">
         <img src="../assets/logo.png">
        </router-link>
        <ul class="head-nav">
          <template v-if="username===''">
            <li @click="logClick">登录</li>
            <li class="nav-pile">|</li>
            <li @click="regClick">注册</li>
          </template>
          <template v-else>
            <li >{{username}}</li>
            <li class="nav-pile">|</li>
            <li @click="quit">注销</li>
          </template>
          <li class="nav-pile">|</li>
          <li @click="aboutClick">关于</li>
        </ul>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2018 Emma Cola .</p>
    </div>
    <!--弹框-->
    <my-dialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>台湾劳工团体人士1月8日晚间赴台北车站卧轨抗议，要求台当局收
        回“过劳死版劳基法”。连日来，围绕引发巨大争议的“修法”，
        台立法机构内外已上演连串武斗戏码。自称“最会沟通”的民进党，
        面对民众抗议、学界请愿和“在野党”劝阻，摆出的却是一副“你奈
        我何”的架势。但岛内舆论认为，民进党虽意色扬扬，殊不知已然
        遭遇上台以来最大政治危机。</p>
    </my-dialog>
    <my-dialog :isShow="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <log-form @has-log="successLog"></log-form>
    </my-dialog>
    <my-dialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <reg-form @has-reg="successReg"></reg-form>
    </my-dialog>
    <!--弹框 end-->
  </div>
</template>

<script>
  import MyDialog from './Dialog.vue'
  import LogForm from './LogForm.vue'
  import RegForm from './RegForm.vue'
  export default {
    name: 'lay-out',
    components:{MyDialog,LogForm,RegForm},
    data () {
      return {
        isShowAboutDialog:false,
        isShowLogDialog:false,
        isShowRegDialog:false,
        username:''
      }
    },
    methods:{
      aboutClick(){//关于
        this.isShowAboutDialog=true;
      },
      regClick(){
        this.isShowRegDialog=true;
      },
      logClick(){
        this.isShowLogDialog=true;
      },
      closeDialog(attr){
        this[attr]=false;
      },
      successLog(data){
        this.closeDialog('isShowLogDialog');
        this.username=data.username;
      },
      successReg(data){
        console.log(1);
        this.closeDialog('isShowRegDialog');
        this.username=data.username;
      },
      quit(){
        this.username='';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }
  .head-logo {
    float: left;
  }
  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }
  .head-nav {
    float: right;
  }
  .head-nav ul {
    overflow: hidden;
  }
  .head-nav li {
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
