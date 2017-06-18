<template>

  <el-row>
    <el-col :push="4" >
      <div style="height: 50px;">
        <a class="logo" href="">YMALL</a>
      </div>

    </el-col>
    <el-col  :push="8" >
      <div style="height: 50px">
        <input class="search-input" id="Searchinput" placeholder="请输入商品名称"/>
        <button class="search-btn">搜索</button>
      </div>

    </el-col>
  </el-row>


</template>

<script>
  export default{

  }

</script>

<style>
   .logo {
    position: absolute;
    left: 50px;
    top: 32px;
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
     height: 42px;
     border: none;
     background-color: #c60023;
     font-size: 17px;
     font-weight: 700;
     color: #fff;
     outline: none;
     cursor: pointer;
   }
</style>
