<template>
  <div>
    <headTop></headTop>
    {{userInfo}}
    <footGuide></footGuide>
  </div>

</template>

<script>
  import {mapState, mapMutations} from "vuex"

  export default {

    mixins: [],     //混合
    components: {},//注册组件
    created(){

    },
    data(){         //数据
      return {}
    },

    computed: {//计算属性
      ...mapState([
        'userInfo',
      ]),
    },
    methods: {

    },   //方法
    watch: {}      //监听
  }
</script>

<style scoped>

</style>

