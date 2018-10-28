import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapse: false,
    userData: {profile:{}},
    playerRender: false,
    playerShow: true,
    songData: {},
    songUrl: ""
  },
  mutations: {
    toggleCollapse: state => state.collapse = !state.collapse,
    getUserData: (state, payload) => state.userData = payload,
    getSongData: (state, payload) => {
      state.songData = payload;
      state.playerRender = true
    },
    getSongUrl: (state, payload) => state.songUrl = payload,
    togglePlayer: state => state.playerShow = !state.playerShow
  }
})
