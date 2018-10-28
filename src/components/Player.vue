<template>
  <div v-if="$store.state.playerRender">
    <transition name="slide-fade">
      <div class="player" v-show="$store.state.playerShow">
        <div class="bg" :style="`background:url('${$store.state.songData.al.picUrl}') center/110%`"></div>
        <div class="shadow"></div>
        <div class="top">
          <v-touch tag="i" class="back" v-on:tap="hidePlayer"></v-touch>
          <div class="song-info">
            <div>
              <span class="name" v-text="$store.state.songData.name"></span>
              <span v-text="$store.state.songData.tns?`(${$store.state.songData.tns[0]})`:''"></span>
            </div>
            <span class="artist" v-text="$contactArtists($store.state.songData.ar)"></span>
          </div>
        </div>
        <div class="phonograph">
          <div class="line"></div>
          <div :class="toneArmClass"></div>
          <div :class="cdClass">
            <div class="cd-bg"></div>
            <img :src="$store.state.songData.al.picUrl">
          </div>
        </div>
        <div class="duration"></div>
        <div class="control-bar">
          <i class="play-style"></i>
          <i class="prev-song"></i>
          <v-touch tag="i" :class="playClass" v-on:tap="playPause"></v-touch>
          <i class="next-song"></i>
          <i class="listen-list"></i>
        </div>
      </div>
    </transition>
    <div class="mini-player">
      <v-touch v-on:tap="showPlayer">
        <img :src="$store.state.songData.al.picUrl">
        <div class="song-info">
          <div>
            <span class="name" v-text="$store.state.songData.name"></span>
            <span class="artist" v-text="$store.state.songData.tns?`(${$store.state.songData.tns[0]})`:''"></span>
          </div>
          <span class="artist" v-text="$contactArtists($store.state.songData.ar)"></span>
        </div>
      </v-touch>
      <v-touch tag="i" :class="playClass" v-on:tap="playPause"></v-touch>
      <i class="listen-list"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Player",
    data() {
      return {
        songUrl: "",
        playClass: "pause",
        toneArmClass: "tone-arm",
        cdClass: "cd"
      }
    },
    methods: {
      showPlayer() {
        this.$store.commit("togglePlayer")
      },
      hidePlayer() {
        this.$store.commit("togglePlayer")
      },
      playPause() {
        if (this.playClass === "play") {
          this.playClass = "pause";
          this.toneArmClass = "tone-arm down";
          this.cdClass = "cd run";
          this.$parent.$refs.audio.play();
        }
        else{
          this.playClass = "play";
          this.toneArmClass = "tone-arm";
          this.cdClass = "cd";
          this.$parent.$refs.audio.pause();
        }
      }
    },
    watch: {
      "$store.state.songUrl": function () {
        this.toneArmClass = "tone-arm down";
        this.cdClass = "cd run";
        this.playClass = "pause";
      }
    }
  }
</script>

<style scoped>
  @keyframes cdRun {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(80%);
    opacity: 0;
  }
  .player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 888;
    background: #888;
  }
  .player .bg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(50px);
  }
  .player .shadow{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  .player .top{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    padding: 2vh 60px 2vh 20px;
    height: 10vh;
    color: #fff;
    font-size: 15px;
  }
  .player .song-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 45px;
    width: 100%;
    overflow: hidden;
  }
  .player .song-info>div{
    font-size: 14px;
    font-weight: bold;
  }
  .player .song-info>span{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .player .song-info .name{
    margin-right: 5px;
  }
  .player .song-info .artist{
    font-size: 12px;
    color: #ccc;
  }
  .phonograph{
    position: absolute;
    top: 10vh;
    width: 100%;
    overflow: hidden;
  }
  .phonograph .line{
    height: 1px;
    background: linear-gradient(270deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.6),hsla(0,0%,100%,0));;
  }
  .phonograph .tone-arm{
    position: absolute;
    top: 0;
    left: 50%;
    width: 90px;
    height: 144px;
    background: url("../assets/aoh.png") no-repeat center/cover;
    transform: translate(-16px,-17.5px) rotate(-30deg);
    transform-origin: 14px 17px;
    transition: all .3s;
    z-index: 3;
  }
  .phonograph .tone-arm.down{
    transform: translate(-16px,-17.5px) rotate(0deg);
  }
  .phonograph .cd{
    position: relative;
    margin: 70px auto 0;
    width: 42vh;
    height: 42vh;
    animation: cdRun 25s linear infinite paused;
  }
  .phonograph .cd.run{
    animation: cdRun 25s linear infinite;
  }
  .phonograph .cd-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/amo.png") no-repeat center/100%;
    z-index: 2;
  }
  .phonograph img{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 68%;
    z-index: 1;
    transform: translate(-50%,-50%);
  }
  .control-bar{
    position: fixed;
    bottom: 0;
    padding: 4vh 0;
    width: 100%;
    height: 50px;
  }
  .control-bar i{
    display: inline-block;
    width: 20%;
    height: 50px;
  }
  .control-bar .play-style{
    background: url("../assets/anq.png") center/80%;
  }
  .control-bar .prev-song{
    background: url("../assets/ame.png") center/100%;
  }
  .control-bar .play{
    background: url("../assets/amc.png") center/110%;
  }
  .control-bar .pause{
    background: url("../assets/ama.png") center/110%;
  }
  .control-bar .next-song{
    background: url("../assets/am9.png") center/100%;
  }
  .control-bar .listen-list{
    background: url("../assets/aoe.png") center/80%;
  }

  .mini-player{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px;
    border-top: 1px solid #f5f5f5;
    height: 40px;
    background: #fff;
    z-index: 887;
  }
  .mini-player img{
    position: absolute;
    left: 5px;
    margin-right: 5px;
    border-radius: 3px;
    width: 40px;
    height: 40px;
  }
  .mini-player .song-info{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    left: 50px;
    right: 100px;
    height: 40px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
  }
  .mini-player .song-info .name{
    font-size: 12px;
  }
  .mini-player .song-info .artist{
    transform: scale(.88);
    transform-origin: 0 0;
    color: #888;
  }
  .mini-player i{
    position: absolute;
    width: 40px;
    height: 40px;
  }
  .mini-player .play{
    right: 50px;
    background: url("../assets/play.png") no-repeat center/66%;
  }
  .mini-player .pause{
    right: 50px;
    background: url("../assets/pause.png") no-repeat center/66%;
  }
  .mini-player .listen-list{
    right: 5px;
    background: url("../assets/a9p.png") center/90%;
  }
</style>