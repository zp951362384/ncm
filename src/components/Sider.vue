<template>
  <div class="sider" @touchmove="noScroll">
    <transition name="fade">
      <v-touch class="sider-mask" v-if="this.$store.state.collapse" v-on:tap="toggleCollapse"></v-touch>
    </transition>
    <transition name="slide-fade">
      <div class="sider-bar" v-show="this.$store.state.collapse">
        <div class="user-banner" v-if='!this.$cookies.isKey("uid")'>
          <div class="banner-mask"></div>
          <div class="no-login">
            <p>登录网易云音乐</p>
            <p>320K高音质无限下载，手机电脑多端同步</p>
            <v-touch tag="button" class="login-btn" v-on:tap="login">立即登录</v-touch>
          </div>
        </div>
        <div class="user-banner" v-if='this.$cookies.isKey("uid")'
             :style="`background:url(${userData.profile.backgroundUrl}) center/100%`">
          <div class="banner-mask"></div>
          <div class="had-login">
            <div class="user-img">
              <img :src="userData.profile.avatarUrl">
            </div>
            <div class="user-info">
              <div>
                <span v-text="userData.profile.nickname"></span>
                <span class="level" v-text="'Lv.'+userData.level"></span>
              </div>
              <v-touch tag="span" class="signin" v-text="userData.mobileSign?'已签到':'签到'" v-on:tap="signin"></v-touch>
            </div>
          </div>
        </div>
        <div class="channel">
          <ul>
            <li>
              <i class="message"></i>
              <span>我的消息</span>
            </li>
            <li>
              <i class="friends"></i>
              <span>我的好友</span>
            </li>
            <li>
              <i class="vip"></i>
              <a href="https://music.163.com/prime/m/portal">会员中心</a>
            </li>
            <li>
              <i class="store"></i>
              <a href="https://music.163.com/store/m/product/index">商城</a>
            </li>
            <li>
              <i class="cloud"></i>
              <span>音乐云盘</span>
            </li>
          </ul>
        </div>
        <div class="sider-footer">
          <v-touch class="logout" v-if='this.$cookies.isKey("uid")' v-on:tap="logout">
            <i class="logout-btn"></i>
            <span>退出</span>
          </v-touch>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    name: "Sider",
    data() {
      return {
        userData: {profile:{}},
      }
    },
    methods: {
      toggleCollapse() {
        this.$store.commit('toggleCollapse');
      },
      login() {
        this.toggleCollapse();
        this.$router.push('/login')
      },
      logout() {
        this.axios.get('/logout')
          .then(function () {
            // console.log(response);
          });
        this.toggleCollapse();
        this.$cookies.remove("uid");
        this.$router.push('/login');
      },
      signin(event) {
        if (!this.userData.mobileSign) {
          this.axios.get('/daily_signin')
            .then(function (response) {
              console.log(response.data);
              event.target.innerText = "已签到"
            });
        }
      },
      noScroll(event) {
        event.preventDefault()
      }
    },
    mounted() {
      if (this.$cookies.isKey("uid")) {
        const _this = this;
        this.axios.get('/user/detail', {
          params: {
            uid: this.$cookies.get("uid"),
          }
        })
          .then(function (response) {
            _this.$store.commit('getUserData',response.data);
            _this.userData = _this.$store.state.userData;
            console.log(_this.userData)
          });
      }
    },
  }
</script>

<style scoped>
  .sider-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: rgba(0, 0, 0, 0.5);
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .sider-bar {
    position: fixed;
    width: 80%;
    height: 100%;
    background: #fff;
    z-index: 999;
    opacity: 1;
    transition: all 0.3s;
  }

  .slide-fade-enter-to, .slide-fade-leave-to {
    transform: translate(0px, 0px);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translate(-80%, 0px)
  }

  .user-banner {
    position: relative;
    height: 180px;
    background: url("../assets/au4.png") no-repeat center/cover;
  }

  .banner-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
  }

  .no-login {
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    padding-top: 40px;
    height: 100%;
    text-align: center;
  }

  .no-login p {
    margin: 0;
    line-height: 20px;
    font-size: 13px;
    color: #aaa;
  }

  .login-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 0;
    border: 1px solid #aaa;
    border-radius: 20px;
    width: 150px;
    height: 30px;
    font-size: 14px;
    color: #fff;
    background: none;
  }
  .login-btn:active{
    background: #ddd;
  }
  .had-login {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    padding: 45px 10px 15px;
    height: 100%;
  }

  .user-img {
    width: 60px;
    height: 60px;
  }

  .user-img img {
    display: block;
    width: 100%;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user-info div{
    display: flex;
    align-items: center;
  }
  .had-login span {
    display: inline-block;
    font-size: 15px;
    color: #f5f5f5;
  }

  .had-login .level {
    margin-left: 10px;
    width: 35px;
    height: 15px;
    line-height: 15px;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    font-family: Arial, serif;
  }
  .had-login .signin{
    float: right;
    border: 1px solid #fff;
    border-radius: 10px;
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .had-login .signin:active{
    opacity: .5;
  }
  .sider-footer {
    position: absolute;
    bottom: 0;
    border-top: 1px solid #eee;
    width: 100%;
  }

  .logout {
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 0;
  }

  .logout-btn {
    display: inline-block;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    background: url("../assets/aub.png") center/100%;
    vertical-align: middle;
    user-select: none;
  }

  .logout span {
    font-size: 14px;
    vertical-align: middle;
  }

  .channel{
    padding: 15px 0;
  }
  .channel li{
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
  }
  .channel li:active{
    background: #ddd;
  }
  .channel li i{
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  .channel .message{
    background: url("../assets/auh.png") center/100%;
  }
  .channel .vip{
    background: url("../assets/aur.png") center/100%;
  }
  .channel .friends{
    background: url("../assets/aud.png") center/100%;
  }
  .channel .store{
    background: url("../assets/auo.png") center/100%;
  }
  .channel .cloud{
    background: url("../assets/au9.png") center/100%;
  }
  .channel li span,.channel li a{
    text-decoration: none;
    font-size: 14px;
    color: #000;
  }
</style>