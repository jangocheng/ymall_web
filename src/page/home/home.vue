<template>
  <div style="background-color: #f9f9f9;">
    <head-top></head-top>
    <div class="main-container">
      <banner :listImg="imgArr" :cssBanner="cssBanner"></banner>
    </div>
    <top :scrollTop="500"></top>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import Vue from "vue";
  import headTop from "components/header/headTop";
  import footGuide from "components/footer/footGuide";
  import banner from './banner.vue';
  export default{
    mixins: [],
    components: { headTop, footGuide, banner},
    created(){
    },
    data(){
      return {
        cssBanner: "css-banner",
        imgArr: [
          {url: '../../../static/img/background.jpg'},
          {url: '../../../static/img/background1.jpg'},
          {url: '../../../static/img/background2.jpg'},
          {url: '../../../static/img/background3.jpg'}
        ]
      }
    },
    methods: {

    },
    filters: {}
  }
</script>
<style lang="less" scoped>
  @rem:12rem;

  .css-banner {
    width: 100%;
    height: 300/@rem;
    margin: 0 auto;
    box-shadow: 0 0 5/@rem #ccc;
  }

  .main-container {
    font-family: 微软雅黑;
    max-width: 1000/@rem;
    margin: 30/@rem auto 20/@rem;
  }
</style>
