<template>
  <div class="sec-views">
    <div class="user-info">
      <div class="user-bar">
        <v-touch v-on:tap="login">
          <img src="../assets/awb.png" v-if="!$cookies.isKey('uid')">
          <img :src="$store.state.userData.profile.avatarUrl" v-if="$cookies.isKey('uid')">
          <span v-text="$cookies.isKey('uid')? $store.state.userData.profile.nickname:'未登录'"></span>
        </v-touch>
      </div>
      <ul class="channel">
        <v-touch tag="li" v-on:tap="toRecord">
          <i class="record"></i>
          <p>
            听歌排行
          </p>
        </v-touch>
        <li>
          <i class="mydj"></i>
          <p>
            我的电台
            <span>(0)</span>
          </p>
        </li>
        <li>
          <i class="mysub"></i>
          <p>
            我的收藏
            <span>(0)</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="playlist">
      <v-touch class="playlist-bar" v-on:tap="toggleMylist">
        <i ref="arrow1" class="fold"></i>
        <span v-text="`创建的歌单(${$cookies.isKey('uid')? $store.state.userData.profile.playlistCount:1})`"></span>
      </v-touch>
      <ul class="list" v-if="!$cookies.isKey('uid')">
        <li>
          <img class="playlist-img" src="../assets/EWC.jpg">
          <div class="playlist-info">
            <p>我喜欢的音乐</p>
            <span>0首</span>
          </div>
        </li>
      </ul>
      <ul class="list" v-if="$cookies.isKey('uid')" v-show="!mylistHide">
        <v-touch tag="li" v-for="items in playlist" :key="items.index" v-if="!items.ordered" v-on:tap="toPld(items.id)">
          <img class="playlist-img" :src="items.coverImgUrl">
          <div class="playlist-info">
            <p v-text="items.name"></p>
            <span v-text="`${items.trackCount}首`"></span>
          </div>
        </v-touch>
      </ul>
      <v-touch class="playlist-bar" v-on:tap="toggleOrderlist" v-if="$cookies.isKey('uid')&&$store.state.userData.profile.playlistCount !== playlist.length">
        <i ref="arrow2" class="fold"></i>
        <span v-text="`收藏的歌单(${playlist.length - $store.state.userData.profile.playlistCount})`"></span>
      </v-touch>
      <ul class="list" v-if="$cookies.isKey('uid')" v-show="!orderlistHide">
        <v-touch tag="li" v-for="items in playlist" :key="items.index" v-if="items.ordered" v-on:tap="toPld(items.id)">
          <img class="playlist-img" :src="items.coverImgUrl">
          <div class="playlist-info">
            <p v-text="items.name"></p>
            <span v-text="`${items.trackCount}首`"></span>
          </div>
        </v-touch>
      </ul>
    </div>
    <div class="loading" v-if="$cookies.isKey('uid')" v-show="!loaded"></div>
  </div>
</template>

<script>
  export default {
    name: "MyMusic",
    data() {
      return {
        loaded: false,
        playlist:[],
        mylistHide: false,
        orderlistHide: false
      }
    },
    methods: {
      login() {
        if (!this.$cookies.isKey("uid")) {
          this.$router.push('/login')
        }
      },
      toggleMylist() {
        this.mylistHide = !this.mylistHide;
        this.$refs.arrow1.style.transform = this.mylistHide? "rotate(-90deg)" : "rotate(0deg)"
      },
      toggleOrderlist() {
        this.orderlistHide = !this.orderlistHide;
        this.$refs.arrow2.style.transform = this.orderlistHide? "rotate(-90deg)" : "rotate(0deg)"
      },
      toRecord() {
        this.$router.push('/record')
      },
      toPld(playlistId) {
        this.$router.push({path:'/pld',query:{id:playlistId}})
      }
    },
    mounted() {
      if (this.$cookies.get("uid")) {
        const _this = this;
        this.$axios('/user/playlist',{
          params:{
            uid: this.$cookies.get("uid")
          }
        })
          .then(function (response) {
            // console.log(response.data);
            _this.playlist = response.data.playlist;
            _this.loaded = true;
          })
      }
    }
  }
</script>

<style scoped>
  .user-info{
    position: relative;
    background: #fff;
  }
  .user-info::before{
    content: "";
    display: block;
    background: #d43c33;
    height: 35px;
  }
  .user-bar{
    box-sizing: border-box;
    position: absolute;
    top: 5px;
    left: 8px;
    right: 8px;
    padding: 0 15px;
    border-radius: 5px;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0 5px 5px 0;
  }
  .user-bar img{
    float: left;
    margin: 10px 10px 0 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .channel{
    margin-top: 40px;
  }
  .channel li{
    position: relative;
    padding-left: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 0;
  }
  .channel li:active{
    background: #ddd;
  }
  .channel li i{
    position: absolute;
    top: 10px;
    width: 30px;
    height: 30px;
    background: url("../assets/at5.png") no-repeat center;
  }
  .channel li p{
    box-sizing: border-box;
    position: absolute;
    left: 55px;
    right: 0;
    margin: 0;
    border-bottom: .5px solid rgba(204, 204, 204, 0.51);
    font-size: 14px;
  }
  .channel li p span{
    font-size: 12px;
    color: #888;
  }
  .channel .record{
    background-position: -10px -125px;
  }
  .channel .mydj{
    background-position: -10px -217px;
  }
  .channel .mysub{
    background-position: -10px -263px;
  }
  .playlist-bar{
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #888;
    background: #f5f5f5;
  }
  .playlist-bar .fold{
    position: absolute;
    left: 15px;
    top: 50%;
    margin-top: -6px;
    width: 12px;
    height: 12px;
    background: url("../assets/asy.png") no-repeat center/100%;
    transition: all .3s;
  }
  .playlist-bar span{
    position: absolute;
    left: 35px;
    font-size: 12px;
    transform: scale(.88);
  }
  .playlist .list li{
    position: relative;
    padding-left: 8px;
    height: 60px;
  }
  .playlist .list li:active{
    background: #ddd;
  }
  .playlist-img{
    position: absolute;
    top: 50%;
    margin-top: -25px;
    border-radius: 3px;
    width: 50px;
    height: 50px;
  }
  .playlist-info{
    box-sizing: border-box;
    position: absolute;
    left: 68px;
    right: 0;
    border-bottom: .5px solid rgba(204, 204, 204, 0.51);
    height: inherit;
  }
  .playlist-info p{
    position: absolute;
    top: 10px;
    margin: 0;
    font-size: 14px;
  }
  .playlist-info span{
    position: absolute;
    bottom: 8px;
    font-size: 12px;
    color: #888;
    transform: scale(.8);
    transform-origin: 0 0;
  }
</style>