<template>
  <div class="container">
    <Sider/>
    <header>
      <v-touch class="side-menu" v-on:tap="toggleCollapse">
        <i></i>
      </v-touch>
      <nav>
        <router-link to="/home/mymusic" exact>
          <i class="mymusic"></i>
        </router-link>
        <router-link to="/home/discover">
          <i class="discover"></i>
        </router-link>
        <router-link to="/home/video">
          <i class="video"></i>
        </router-link>
      </nav>
      <a class="search-btn">
        <i></i>
      </a>
    </header>
    <router-view></router-view>
  </div>

</template>

<script>
  import Sider from "../components/Sider";

  export default {
    name: "Home",
    components: {Sider},
    data() {
      return {}
    },
    methods: {
      toggleCollapse() {
        this.$store.commit('toggleCollapse');
      },
    }
  }
</script>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 15px;
    height: 50px;
    background: #d43c33;
    color: #fff;
    font-size: 0;
    z-index: 5;
  }

  header i {
    display: inline-block;
    width: 25px;
    height: 25px;
  }

  .side-menu {
    float: left;
    margin-top: 17px;
    width: 10%;
  }

  .side-menu i {
    background: url("../assets/mbtn.png") center/100%;
  }

  .search-btn {
    float: right;
    width: 10%;
  }

  .search-btn i {
    float: right;
    margin-top: 17px;
    background: url("../assets/sj.png") center/100%;
  }

  nav {
    box-sizing: border-box;
    float: left;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    padding: 0 60px;
    width: 80%;
  }

  nav i {
    width: 30px;
    height: 30px;
    opacity: .5;
  }

  .router-link-active i {
    opacity: 1;
  }

  .mymusic {
    background: url("../assets/mymusic.png") center/200%;
  }

  .discover {
    background: url("../assets/discover.png") center/200%;
  }

  .video {
    background: url("../assets/video.png") center/200%;
  }
</style>