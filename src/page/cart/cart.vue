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
        'ADD_CART',
        'UPDATE_CART_PRODUCT_COUNT',
        'DELETE_CART_PRODUC',
        'DELETE_CART_PRODUCT_ALL_CHECKED',
        'CART_CHECK_ALL',
        'CART_CHECK_SINGLE'
      ]),
      add(){
        this.ADD_CART({productId:29,count:10}).then(()=>{
            this.$message.info(this.cart.productTotal)
        },error=>{
          this.$message.error(error.response.data.msg)
          }
        )

        this.CART_CHECK_SINGLE()
      }
    },
    //观测方法
    watch: {}
  };
</script>

<style scoped>

</style>
