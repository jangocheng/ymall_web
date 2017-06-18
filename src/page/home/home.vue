<template>
  <div style="background-color: #f9f9f9;">
    <head-top></head-top>
    <div class="w">
      <LeftSidebar></LeftSidebar>
      <div class="main-container">
          <banner :listImg="imgArr" :cssBanner="cssBanner"></banner>
      </div>
    </div>
    <CommodityBar></CommodityBar>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import vue from "vue";
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import banner from './banner.vue';
  import { Switch,tabPane } from "element-ui";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import Searchbar from  "components/assembly/Searchbar"
  import LeftSidebar from "components/LeftSidebar/LeftSidebar"
  import CommodityBar from "components/assembly/CommodityBar"

  vue.use(Switch);

  export default{

    mixins: [],
      components: {
        ElCol,
        ElRow,
        LeftSidebar,
        Searchbar,
        CommodityBar,
        headTop, footGuide, banner},//注册组件
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
        ],
        is_switch:false,
        num:6,
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
    float: left;
    padding: 1px 0;
    width: 800px;
    margin-right: 10px;
    height: 200px;
    background: #ccc;
    color: #fff;
  }
  .w {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

</style>
