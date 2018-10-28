<template>
  <div class="container">
    <div class="header">
      <v-touch tag="i" class="back" v-on:tap="back"></v-touch>
      <span class="title">听歌排行</span>
    </div>
    <div class="warning" v-if="!$cookies.isKey('uid')">请先登录</div>
    <div class="main" v-if="$cookies.isKey('uid')">
      <nav>
        <v-touch tag="span" class="active" v-on:tap="weekRecord">最近一周</v-touch>
        <v-touch tag="span" v-on:tap="allRecord">所有时间</v-touch>
      </nav>
      <ul class="list">
        <li v-for="(items,index) in recordData" :key="index">
          <span class="num" v-text="index+1"></span>
          <div class="song-info">
            <p>
              <span class="name" v-text="items.song.song.name"></span>
              <span class="alia" v-text="items.song.al.alia? `(${items.song.al.alia[0]})`:''"></span>
            </p>
            <p>
              <span class="artist" v-text="contactArtists(items.song.ar)"></span>
               -
              <span class="album" v-text="items.song.al.name"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading" v-if="$cookies.isKey('uid')" v-show="!loaded"></div>
  </div>
</template>

<script>
  export default {
    name: "Record",
    data() {
      return {
        loaded: false,
        recordType: 1,
        recordData: {},
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      weekRecord(event) {
        this.recordType = 1;
        event.target.className = "active";
        event.target.nextElementSibling.className = "";
        this.loaded = false;
        this.getRecordData();
      },
      allRecord(event) {
        this.recordType = 0;
        event.target.className = "active";
        event.target.previousElementSibling.className = "";
        this.loaded = false;
        this.getRecordData();
      },
      getRecordData() {
        const _this = this;
        this.$axios.get('/user/record', {
          params: {
            uid: _this.$cookies.get("uid"),
            type: _this.recordType
          }
        })
          .then(function (response) {
            _this.recordData = _this.recordType === 1 ? response.data.weekData : response.data.allData
            _this.loaded = true
          })
      },
      contactArtists(arr) {
        let str = "";
        let newArr = [];
        for (let obj of arr) {
          newArr.push(obj.name);
          str = newArr.join("/");
        }
        return str
      }
    },
    mounted() {
      if (this.$cookies.isKey("uid")) {
        this.getRecordData()
      }

    }
  }
</script>

<style scoped>
  .warning{
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 100px;
    width: 100%;
    text-align: center;
    font-size: 14px;
    background: url("../assets/ak_.png") no-repeat center;
  }
  .main{
    padding-top: 50px;
  }
  .main nav {
    padding: 5px 0;
    background: #d43c33;
  }

  .main nav span {
    position: relative;
    display: inline-block;
    width: 50%;
    height: 25px;
    text-align: center;
    font-size: 15px;
    color: #fff;
  }

  .main nav .active {
    font-weight: bold;
  }

  .main nav .active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 25%;
    height: 3px;
    background: #fff;
    border-radius: 3px;
  }
  .list li {
    position: relative;
    height: 55px;
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    left: 55px;
    right: 0;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    height: 55px;
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
  .loading{
    top: 86px;
  }
</style>