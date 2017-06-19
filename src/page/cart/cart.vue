<template>
  <div id="">
    <head-top></head-top>
    <div class="cart-main">
      <div class="crumb">
        <div class="w">
          <div class="crumb-list">
            <a class="crumb-item" href="/home">YMall</a>
            <span></span>
            <span class="crumb-item">我的购物车</span>
          </div>
        </div>
      </div>
      <div class="cart-wrap w">
        <div>
          <el-table
            ref="table"
            :data="cart.cartItemList"
            :stripe="true"
            @cell-click="handleCellClick"
            :highlight-current-row="true"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="商品信息"
              width="600">
              <template scope="scope">
                <router-link to="#" target="_blank">
                  <img class="p-img" :src="scope.row.productMainImage | defaultImg"/>
                </router-link>
                <router-link class="link p-name" to="#" target="_blank">
                  {{scope.row.productName}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="120"
            >
              <template scope="scope">
                ￥{{scope.row.productPrice}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="150"
            >
              <template scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  size="small"
                  :debounce="400"
                  @change="updateCount"
                  :min="1" :max="scope.row.productStock"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="cart-footer clear">
          <div class="select-con">
            <label>
              <input class="cart-select-all" type="checkbox" checked="checked"/>
              <span>全选</span>
            </label>
          </div>
          <div class="delete-con">
            <a class="cart-delete-seleced link">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              <span>删除选中</span>
            </a>
          </div>
          <div class="submit-con">
            <span>总价：</span>
            <span class="submit-total">373893</span>
            <span class="btn submit-btn">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import vue from "vue"
  import {table, tableColumn, input, pagination, inputNumber} from "element-ui"
  vue.use(input)
  vue.use(table)
  vue.use(tableColumn)
  vue.use(pagination)
  vue.use(inputNumber)

  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import {mapState, mapMutations, mapActions} from "vuex"


  export default {

    //注册组件
    components: {headTop, footGuide},
    //数据
    data(){
      return {
        currentProductId:""
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
        this.ADD_CART({productId: 29, count: 10}).then(() => {
            this.$message.info(this.cart.productTotal)
          }, error => {
            this.$message.error(error.response.data.msg)
          }
        )

        this.CART_CHECK_SINGLE()
      },
      handleCellClick(row, column, cell, event){
           this.currentProductId=row.productId
      },
      updateCount(count){
          setTimeout(()=>{
            this.UPDATE_CART_PRODUCT_COUNT({productId:this.currentProductId,count:count}).then(()=>{},error=>{this.$message.info(error.response.data.msg)})
          },500)
      }
    },
    //观测方法
    watch: {}
  };
</script>

<style scoped>
  .crumb {
    margin-bottom: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    background: #eeeeee;
    color: #888;
    border-top: 2px solid #c60023;
  }

  .w {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .crumb .crumb-item {
    color: #888;
    text-decoration: none;
    cursor: pointer;
  }

  .cart-wrap {
    margin-top: 20px !important;
    text-align: left;
  }

  .w {
    width: 1080px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .link {
    color: #999999;
    text-decoration: none;
    cursor: pointer;
  }

  .p-img {
    width: 80px;
    height: 80px;
    border: 1px solid #dddddd;
  }

  .cart-wrap .cart-footer {
    position: relative;
    line-height: 50px;
    background: #eee;
  }

  .cart-wrap .cart-footer .select-con {
    float: left;
    padding-left: 20px;
  }

  .cart-wrap .cart-footer .delete-con {
    float: left;
    margin-left: 20px;
  }

  .fa {
    display: inline-block;
    font-size: inherit;
  }

  .cart-wrap .cart-footer .submit-con {
    float: right;
  }

  .cart-wrap .cart-footer .submit-con .submit-total {
    font-size: 18px;
    color: #c60023;
    font-weight: 700;
    margin-right: 30px;
    vertical-align: middle;
  }

  .cart-wrap .cart-footer .submit-con .submit-btn {
    height: 50px;
    line-height: 50px;
  }

  .btn {
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
