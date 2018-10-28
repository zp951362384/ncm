<template>
  <div>
    <div class="container" v-if="doRender" @touchmove="changeBg">
      <div class="header">
        <div class="header-bg" :style="`background:url('${pldData.playlist.coverImgUrl}') center/5800%;opacity:${headerBgO}`"></div>
        <v-touch tag="i" class="back" v-on:tap="back"></v-touch>
        <span class="title">歌单</span>
      </div>
      <div class="cover" :style="`background:url('${pldData.playlist.coverImgUrl}') center/5800%`">
        <div class="cover-main">
          <div class="cover-img">
            <img :src="pldData.playlist.coverImgUrl">
            <div>
              <i></i>
              <span v-text="transPlayCount(pldData.playlist.playCount)"></span>
            </div>
          </div>
          <div class="cover-info">
            <p v-text="pldData.playlist.name"></p>
            <div>
              <img :src="pldData.playlist.creator.avatarUrl">
              <span v-text="pldData.playlist.creator.nickname"></span>
            </div>
          </div>
        </div>
        <ul class="cover-bar">
          <li>
            <i class="comment"></i>
            <span v-text="pldData.playlist.commentCount === 0?'评论': pldData.playlist.commentCount"></span>
          </li>
          <li>
            <i class="share"></i>
            <span v-text="pldData.playlist.shareCount === 0?'分享': pldData.playlist.shareCount"></span>
          </li>
          <li>
            <i class="download"></i>
            <span>下载</span>
          </li>
          <li>
            <i class="multi"></i>
            <span>多选</span>
          </li>
        </ul>
      </div>
      <div class="list">
        <div class="list-bar">
          <div class="bar-left">
            <i></i>
            播放全部
            <span v-text="`(共${pldData.playlist.tracks.length}首)`"></span>
          </div>
          <div class="bar-right" v-if="pldData.playlist.creator.userId !== $store.state.userData.profile.userId">
            <i></i>
            收藏
            <span v-text="`(${transSubscribeCount(pldData.playlist.subscribedCount)})`"></span>
          </div>
        </div>
        <ul>
          <v-touch tag="li" v-for="(items,index) in pldData.playlist.tracks" :key="index" v-on:tap="sendSongData(items)">
            <span class="num" v-text="index+1"></span>
            <div class="song-info">
              <p>
                <span class="name" v-text="items.name"></span>
                <span class="alia" v-text="items.alia[0]?`(${items.alia[0]})`:''"></span>
              </p>
              <p>
                <span class="artist" v-text="$contactArtists(items.ar)"></span>
                -
                <span class="album" v-text="items.al.name"></span>
              </p>
            </div>
          </v-touch>
        </ul>
      </div>
    </div>
    <div class="loading" v-if="$cookies.isKey('uid')" v-show="!loaded"></div>
  </div>
</template>

<script>
  export default {
    name: "PlaylistDetail",
    data() {
      return {
        loaded: false,
        doRender: false,
        pldData: {playlist: {creator: {}}},
        headerBgO: 0
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      changeBg() {
        this.headerBgO = document.documentElement.scrollTop / 260
      },
      transPlayCount(num) {
        if (num >= 10000) {
          num = parseInt(num/10000) + "万";
          return num
        }
        else {
          return num
        }
      },
      transSubscribeCount(num) {
        if (num >= 100000) {
          num = parseFloat(num/100000).toFixed(1) + "万";
          return num
        }
        else {
          return num
        }
      },
      sendSongData(song) {
        this.$store.commit("getSongData",song);
        const _this = this;
        this.$axios.get("/song/url",{
          params: {
            id: this.$store.state.songData.id
          }
        })
          .then(function (response) {
            _this.$store.commit("getSongUrl",response.data.data[0].url);
          });
      }
    },
    mounted() {
      const _this = this;
      this.$axios.get('/playlist/detail', {
        params: {
          id: this.$route.query.id,
        }
      })
        .then(function (response) {
          _this.pldData = response.data;
          _this.doRender = true;
          _this.loaded = true
        })
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    width: 100%;
    z-index: 10;
    background: transparent;
  }

  .header-bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .back{
    z-index: 2;
  }

  .title{
    position: relative;
  }

  .cover {
    padding: 90px 20px 30px;
    background: rgba(0, 0, 0, 0.8);
  }

  .cover-main {
    overflow: hidden;
  }

  .cover-img {
    position: relative;
    float: left;
    border-radius: 3px;
    width: 38%;
    overflow: hidden;
  }

  .cover-img img {
    display: block;
    width: 100%;
  }

  .cover-img div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    right: 3px;
    top: 3px;
    width: 40px;
    color: #fff;
    font-size: 12px;
    transform: scale(.88);
  }
  .cover-img div i{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url("../assets/a8t.png") center/100%;
  }
  .cover-info {
    float: left;
    margin-left: 8%;
    width: 50%;
    color: #fff;
  }

  .cover-info > p {
    margin: 10px 0 20px 0;
    font-weight: bold;
  }

  .cover-info > div {
    display: flex;
    align-items: center;
  }

  .cover-info img {
    margin-right: 10px;
    width: 25px;
    border-radius: 50%;
  }

  .cover-info span {
    font-size: 12px;
  }

  .cover-bar {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }

  .cover-bar li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #fff;
  }

  .cover-bar li i {
    margin-bottom: 5px;
    width: 22px;
    height: 22px;
  }

  .cover-bar li span {
    transform: scale(.8);
  }

  .cover-bar .comment {
    background: url("../assets/aaz.png") center/100%;
  }

  .cover-bar .share {
    background: url("../assets/ab7.png") center/100%;
  }

  .cover-bar .download {
    background: url("../assets/ab0.png") center/100%;
  }

  .cover-bar .multi {
    background: url("../assets/ab4.png") center/100%;
  }

  .list {
    margin-top: -10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background: #fff;
    overflow: hidden;
  }

  .list-bar{
    position: relative;
    border-bottom: 1px solid #f5f5f5;
    height: 45px;
    line-height: 45px;
    font-size: 0;
  }
  .list-bar div{
    position: absolute;
    display: inline-block;
    font-size: 15px;
  }
  .bar-left{
    box-sizing: border-box;
    padding-left: 55px;
    width: 100%;
  }
  .bar-left:active{
    background: #ddd;
  }
  .bar-left i{
    position: absolute;
    left: 0;
    width: 55px;
    height: 45px;
    background: url("../assets/abw.png") no-repeat center/40%;
  }
  .bar-left span{
    font-size: 13px;
    color: #888;
  }
  .bar-right{
    right: 0;
    background: #e13d33;
    width: 35%;
    text-align: center;
    color: #fff;
  }
  .bar-right:active{
    background: #c33229;
  }
  .bar-right i{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("../assets/a73.png") center/100%;
    vertical-align: -2px;
  }
  .list li {
    position: relative;
    height: 55px;
  }

  .list li:active{
    background: #ddd;
  }

  .list li .num {
    position: absolute;
    width: 55px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    color: #aaa;
    font-size: 15px;
  }

  .list .song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 55px;
    right: 0;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    height: 39px;
  }

  .list .song-info p {
    margin: 0;
    width: 90%;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list .song-info p:last-child {
    font-size: 12px;
    color: #888;
    transform: scale(.88);
    transform-origin:0 0;
  }

  .list .alia {
    margin-left: 5px;
    color: #aaa;
  }
</style>