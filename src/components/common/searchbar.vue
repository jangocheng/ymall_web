<template>

  <el-row>
    <el-col :push="4" >
      <div style="height: 50px;">
        <router-link class="logo" :to="{ path: 'home' }">YMALL</router-link>
      </div>
    </el-col>
    <el-col  :push="8" >
      <div style="height: 50px">
        <input v-model="keyword" class="search-input" id="Searchinput" placeholder="请输入商品名称"
               @keyup.enter="searchBar"/>
          <button @click="searchBar()" class="search-btn">搜索</button>
      </div>
    </el-col>
  </el-row>


</template>

<script>
  export default{
    data(){
        return{
            keyword:''
        }
    },
    methods:{
      searchBar(){
          this.$router.push({ path: 'productList', query: { keyword:this.keyword }})
      }
    }
  }

</script>

<style>
   .logo {
    position: absolute;
    left: 50px;
    top: 42px;
    display: block;
    width: 150px;
    font-size: 36px;
    font-weight: 700;
    color: #c60023;
    text-decoration: none;
    text-align: center;
  }
   .search-input {
     width: 550px;
     padding: 10px;
     border: 2px solid #c60023;
     font-size: 15px;
     outline: none;
   }
   .search-btn {
     position: absolute;
     width: 80px;
     height: 41px;
     border: none;
     background-color: #c60023;
     font-size: 17px;
     font-weight: 700;
     color: #fff;
     outline: none;
     cursor: pointer;
   }
</style>
