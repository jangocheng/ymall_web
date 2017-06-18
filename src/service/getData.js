/**
 * Created by zc on 2017/3/18.
 * AJAX 同一管理
 */

import ajax from "utils/http.js";



//用户登录
var login = myData => ajax('post', '/api/user/login/', myData);

//注册
var register = (myData) => ajax('post', '/api/user/register', myData)

//获取用户信息
var getUserInfo = () => ajax("get", "/api/user/my_info", {});

//用户注销
var logout = () => ajax("post", "/api/user/logout", {});

//验证用户名与邮箱是否存在
var isusername = (myData) => ajax("get", "/api/user/check_valid",
  Object.assign(myData,{type:"username"}));
var isemail = (myData) => ajax("get", "/api/user/check_valid",
  Object.assign(myData,{type:"email"}));

//获取商品品类
var CommodityCategory = myData => ajax("get", "/api/category/sub_list/", myData);



export {
  login,
  register,
  logout,
  getUserInfo,
  CommodityCategory,
  isusername,
  isemail
}



