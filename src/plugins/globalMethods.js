export default {
  install (Vue) {
    Vue.prototype.$contactArtists = function (arr) {
      let str = "";
      let newArr = [];
      for (let obj of arr) {
        newArr.push(obj.name);
        str = newArr.join("/");
      }
      return str
    }
  }
}