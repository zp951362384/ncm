<template>
  <div class="sec-views">
    <div class="banner">
      <Banner/>
    </div>
    <div class="channel">
      <ul>
        <li>
          <i class="fm"></i>
          <span>私人FM</span>
        </li>
        <li>
          <i class="daily"></i>
          <span>每日推荐</span>
        </li>
        <li>
          <i class="playlist"></i>
          <span>歌单</span>
        </li>
        <li>
          <i class="rank"></i>
          <span>排行榜</span>
        </li>
      </ul>
    </div>
    <div class="re-box recommend-playlist">
      <h3>
        <span>推荐歌单</span>
        <i></i>
      </h3>
      <ul>
        <v-touch tag="li" v-for="items in recommendPlaylist" :key="items.index" v-on:tap="toPld(items.id)">
          <div>
            <img :src="items.picUrl">
            <div class="mask"></div>
          </div>
          <p v-text="items.name"></p>
        </v-touch>
      </ul>
    </div>
    <div class="loading" v-if="$cookies.isKey('uid')" v-show="!loaded"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Banner from "./Banner";
  export default {
    name: "Discover",
    components: {Banner},
    data() {
      return {
        loaded: false,
        recommendPlaylist: [],
        newsong: [],
        dj: [],

      }
    },
    methods: {
      toPld(playlistId) {
        this.$router.push({path:'/pld',query:{id:playlistId}})
      }
    },
    mounted() {
      const _this = this;
      axios.all([
        axios.get('/personalized'),
        axios.get('/personalized/newsong'),
        axios.get('/dj/recommend')
      ])
        .then(axios.spread(function (playlistResp, newsongResp, djResp) {
          // console.log(playlistResp.data);
          // console.log(newsongResp);
          // console.log(djResp.data);
          _this.recommendPlaylist = playlistResp.data.result;
          _this.newsong = newsongResp.data.result;
          _this.dj = djResp.data.result;
          _this.loaded = true
        }))
    }
  }
</script>

<style scoped>
  .banner{
    position: relative;
    height: 210px;
    background: #fff;
  }
  .banner::before{
    content: "";
    display: block;
    height: 140px;
    background: #d43c33;
  }
  .channel{
    padding: 0 8px 20px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.51);
  }
  .channel ul{
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .channel li{
    text-align: center;
    font-size: 12px;
  }
  .channel li i{
    display: block;
    margin-bottom: 12px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: rgba(212, 60, 51, 0.2) 0 6px 8px 1px;
  }
  .channel .fm{
    background: #e13d34 url("../assets/icn_fm.png") center/100%;
  }
  .channel .daily{
    background: #e13d34 url("../assets/icn_daily.png") center/100%;
  }
  .channel .playlist{
    background: #e13d34 url("../assets/icn_playlist.png") center/100%;
  }
  .channel .rank{
    background: #e13d34 url("../assets/icn_rank.png") center/100%;
  }
  .re-box{
    padding: 10px 8px;
  }
  .re-box h3{
    font-size: 15px;
  }
  .re-box h3 i{
    display: inline-block;
    margin-left: 8px;
    width: 9px;
    height: 15px;
    background: url("../assets/as.png") center/100%;
    vertical-align: middle;
  }
  .re-box h3 span{
    vertical-align: middle;
  }
  .re-box ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .re-box li{
    position: relative;
    width: 32.5%;
  }
  .re-box li>div{
    position: relative;
    border-radius: 3px;
    overflow: hidden;
  }
  .re-box li img{
     display: block;
     width: 100%;
   }
  .re-box li .mask{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/xj.9.png") center/100%;
  }
  .re-box li p{
    margin: 8px 0 20px -2px;
    width: 103%;
    font-size: 12px;
    transform: scale(.9);
  }
</style>