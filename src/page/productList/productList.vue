<template>
    <div id="">
      <head-top></head-top>
      <div>

        <load-list ref="productList" :data_list="dataList"
                   :total_page="totalPage" class=""
                   @loadData="loadData"
                   mode="pen">
          <template slot="item" scope="product">

          </template>
        </load-list>

      </div>

      <foot-guide></foot-guide>
    </div>
</template>

<script>
  import headTop from "components/header/headTop";//导入组件
  import footGuide from "components/footer/footGuide";
  import loadList from  "components/common/loadList"
    export default {

        //注册组件
        components: {headTop,footGuide,loadList},
        //数据
        data(){
            return {
              isPersonalShow: false,
              dataList: [],
              totalPage: 0,
            }
        },
        //组件创建时
        created(){
        },
        //数据挂载时
        mounted(){
        },
        //计算属性
        computed: {},
        //方法
        methods: {
            //获取数据
          loadData(myData){
            XXXXXXXXX (Object.assign(myData, {
             字段名 : this.$route.query.路由参数,
            })).then(response => {
              this.totalPage = response.pageCount;
              this.dataList = response.results;
            }, error => {
              this.message.info(error.response.data.content)
            })
          }

        },
        //观测方法
        watch: {}
    };
</script>

<style scoped>

</style>
