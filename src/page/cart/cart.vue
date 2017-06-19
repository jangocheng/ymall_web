<template>
  <div id="">
    <head-top></head-top>
    <h1>cart-购物车</h1>
    <el-button @click="add()">qqqq</el-button>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import {mapState, mapMutations, mapActions} from "vuex"
  export default {

    //注册组件
    components: {headTop,footGuide},
    //数据
    data(){
      return {
        isPersonalShow: false
      }
    },
    //组件创建时
    created(){
    },
    //数据挂载时
    mounted(){
    },
    //计算属性
    computed: {
      ...mapState([
        'cart'
      ]),
    },
    //方法
    methods: {
      ...mapActions([
        'ADD_CART'
      ]),
      add(){
        this.ADD_CART({productId:29,count:10}).then(()=>{
            this.$message.info(this.cart.productTotal)
        },error=>{
          this.$message.error(error.response.data.msg)
          }
        )
      }
    },
    //观测方法
    watch: {}
  };
</script>

<style scoped>
  .crumb{
    margin-bottom: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #eeeeee;
    color: #888;
    border-top: 2px solid #c60023;
  }
  .w{
    width: 1080px;
    margin:  0 auto;
    position: relative;
    overflow: hidden;
  }
  .crumb .crumb-item{
    color: #888;
    text-decoration: none;
    cursor: pointer;
  }
  .cart-wrap{
    margin-top: 20px;!important;
    text-align: left;
  }
  .w{
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }
  .cart-wrap .cart-header{
    background: #eeeeee;
  }
  .cart-wrap .cart-table{
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin-bottom: 10px;
  }
  .cart-wrap .cart-header .cell-check{
    width: 130px;
  }
  .cart-wrap .cart-table .cell-check{
    padding-left: 20px;
    text-align: left;
  }
  .cart-wrap .cart-header .cart-cell{
    height: 40px;
    line-height: 40px;
  }
  input{
    cursor: pointer;
  }
  .cart-wrap .cart-table .cell-check{
    text-align: left;
  }
  .cart-wrap .cart-header .cart-cell{
    line-height: 40px;
  }
  .cart-wrap .cart-table .cell-info{
    width: 400px;
    padding: 0 10px;
  }
  .cart-wrap .cart-table .cell-price{
    width: 100px;
    text-align: center;
  }
  .cart-wrap .cart-table .cell-count{
    width: 200px;
    text-align: center;
  }
  .cart-wrap .cart-table .cell-total{
    width: 100px;
    text-align: center;
  }
  .cart-wrap .cart-table .cell-opera{
    width: 110px;
    text-align: center;
  }
  .cart-wrap .cart-table{
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin-bottom: 10px;
  }
  .cart-wrap .cart-table .cell-check{
    width: 30px;
    padding-left: 20px;
    text-align: left;

  }
  .cart-wrap .cart-list .cart-table .cell-img{
    width: 80px;
    padding: 10px;
  }
  .cart-wrap .cart-list .cart-table .cell-img .p-img{
    width: 80px;
    height: 80px;
    border: 1px solid #dddddd;
  }
  img{
    display: block;
  }
  .cart-wrap .cart-table .cell-info{
    width: 400px;
    padding: 0 10px;
  }
  .cart-wrap .cart-table .cell-info .p-name{
    line-height: 18px;
  }
  .link{
    color: #999999;
    text-decoration: none;
    cursor: pointer;
  }
  .cart-wrap .cart-table .cell-price{
    width: 100px;
    text-align: center;
  }
  .cart-wrap .cart-table .cell-count{
    width: 200px;
    text-align: center;
  }
  .cart-wrap .cart-table .cell-count .count-btn{
    display: inline-block;
    width: 20px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #dddddd;
    vertical-align: middle;
    cursor: pointer;
    background: #ffffff;
  }
  .cart-wrap .cart-table .cell-count .count-input{
    width: 60px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #dddddd;
    text-align: center;
    vertical-align: middle;
    outline: none;
  }
  .cart-wrap .cart-list .cart-table .cell-total{
    color: #000;
    font-weight: 700;
  }
  .cart-wrap.cart-table .cell-total{
    width: 100px;
    text-align: center;
  }
  .cart-wrap.cart-table .cell-opera{
    width: 110px;
    text-align: center;
  }
  .link{
    color: #999;
    text-decoration: none;
    cursor: pointer;
  }
  .cart-wrap .cart-footer{
    position: relative;
    line-height: 50px;
    background: #eee;
  }
  .cart-wrap .cart-footer .select-con{
    float: left;
    padding-left: 20px;
  }
  .cart-wrap .cart-footer .delete-con{
    float: left;
    margin-left: 20px;
  }
  .fa{
    display: inline-block;
    font-size: inherit;
  }
  .cart-wrap .cart-footer .submit-con{
    float: right;
  }
  .cart-wrap .cart-footer .submit-con .submit-total{
    font-size: 18px;
    color: #c60023;
    font-weight: 700;
    margin-right: 30px;
    vertical-align: middle;
  }
  .cart-wrap .cart-footer .submit-con .submit-btn{
    height: 50px;
    line-height: 50px;
  }
  .btn{
    display: inline-block;
    padding: 0 20px;
    vertical-align: middle;
    border: none;
    background-color: #c60023;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }
</style>
