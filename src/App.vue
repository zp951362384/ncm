<template>
  <div id="app">
    <router-view></router-view>
    <Player/>
    <audio ref="audio" :src="$store.state.songUrl" autoplay="autoplay"></audio>
  </div>
</template>

<style>
  html, body, #app,.container{
    height: 100%;
    line-height: normal;
  }
    ul,ol{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .header {
    position: fixed;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #d43c33;
    color: #fff;
    font-size: 15px;
  }
  .back {
    position: absolute;
    top: 50%;
    margin-right: 20px;
    width: 25px;
    height: 25px;
    background: url("./assets/ru.png") center/100%;
    transform: translateY(-50%);
  }
  .title {
    padding-left: 45px;
  }
  .sec-views{
    padding-top: 50px;
  }
  .loading{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff url("./assets/timg (1).gif") no-repeat 50% 40%;
  }

</style>

<script>
  import "normalize.css";
  import Home from "./views/Home";
  import Player from "./components/Player";
  export default {
    components: {Player, Home},
  }
</script>