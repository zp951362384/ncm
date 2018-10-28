<template>
  <div class="container">
    <div class="header">
      <v-touch tag="i" class="back" v-on:tap="back"></v-touch>
      <span class="title">手机号登录</span>
    </div>
    <div class="login-box">
      <div>
        <i class="phone-ico"></i>
        <input type="text" title="phone" placeholder="请输入手机号" v-model="phone" @keyup="showClean" @focus="showClean"
               @blur="hideClean"/>
        <v-touch tag="i" class="clean-ico" v-on:tap="cleanPhone" v-if="cleanShow"></v-touch>
      </div>
      <div>
        <i class="pwd-ico"></i>
        <input type="password" title="pwd" placeholder="请输入密码" v-model="pwd"/>
      </div>
      <p class="error" v-text="errorMsg"></p>
      <v-touch tag="button" class="login-btn" type="button" v-on:tap="login">登录</v-touch>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        cleanShow: false,
        errorMsg: "",
        phone: "",
        pwd: ""
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      cleanPhone() {
        this.phone = '';
        this.cleanShow = false
      },
      showClean(event) {
        event.target.value === "" ? this.cleanShow = false : this.cleanShow = true
      },
      hideClean() {
        this.cleanShow = false
      },
      login() {
        let _this = this;
        this.axios.get('/login/cellphone', {
          params: {
            phone: this.phone,
            password: this.pwd
          },
        })
          .then(function (response) {
            _this.$cookies.set("uid", response.data.account.id);
            _this.$router.push('/');
          })
          .catch(function () {
            _this.errorMsg = "用户名或密码错误"
          })


      }
    }
  }
</script>

<style scoped>
  .login-box {
    padding: 80px 20px 0;
  }

  .login-box > div {
    margin-bottom: 25px;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    height: 25px;
    overflow: hidden;
  }

  .login-box i {
    float: left;
    margin-right: 8px;
    width: 20px;
    height: 24px;
  }

  .phone-ico {
    background: url("../assets/ag_.png") no-repeat center/95%;
  }

  .pwd-ico {
    background: url("../assets/agb.png") no-repeat center/95%;
  }

  .login-box .clean-ico {
    float: right;
    background: url("../assets/age.png") no-repeat center/80%;
  }

  .login-box input {
    float: left;
    padding: 0;
    border: none;
    width: 80%;
    height: 24px;
    outline: none;
    caret-color: #d43c33;
  }

  .login-box input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 15px;
  }

  .login-btn {
    display: block;
    margin-top: 20px;
    border: none;
    width: 100%;
    height: 40px;
    background: #e13d34;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    outline: none;
  }
  .login-btn:active{
    background: #c33229;
  }
  .error{
    margin: 0;
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #d43c33;
  }
</style>