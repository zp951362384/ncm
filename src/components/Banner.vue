<template>
    <swiper :options="swiperOption" ref="mySwiper" v-if="loadSwiper">
      <swiper-slide v-for="items in bannerData" :key="items.index" :style="`background:url('${items.backgroundUrl}')`">
        <img :src="items.picUrl">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "Banner",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        loadSwiper: false,
        bannerData: [],
        swiperOption: {
          autoplay:true,
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          observer:true,
          observeParents:true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
      }
    },
    mounted() {
      const _this = this;
      this.$axios.get('/banner', {
      })
        .then(function (response) {
          // console.log(response.data);
          _this.bannerData = response.data.banners;
          _this.loadSwiper = true
        });
    }
  }
</script>

<style>
  .swiper-container {
    box-sizing: border-box;
    position: absolute;
    top: 20px;
    width: 100%;
    height: 165px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 8px;
  }
  .swiper-slide {
    border-radius: 8px;
    overflow: hidden;
  }
  .swiper-pagination-bullets{
    bottom: 6px;
  }
  .swiper-pagination-bullet{
    background: #fff;
    opacity: .3;
  }
  .swiper-pagination-bullet-active{
    background: #d43c33;
    opacity: .8;
  }
  .swiper-slide img{
    width: 100%;
    height: 100%;
  }
</style>