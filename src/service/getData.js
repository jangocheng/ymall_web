/**
 * Created by zc on 2017/3/18.
 * AJAX 同一管理
 */

import ajax from "utils/http.js";


/**
 * 用户登录
 * @param username
 * @param password
 */
var login = user => ajax('post', '/api/account/login/', user);
/*
 *
 * 获取验证码
 * @param flag
 * @param phone_number
 * */
var getSmsCode = (myData) => ajax('post', '/api/sms/auth_sms', myData)
/*
 * 用户注册
 * @param phone_number
 * @param password
 * @param auth_code
 *
 * */
var register = (myData) => ajax('post', '/api/account/register/', myData)

/**
 * 获取用户信息
 */
var getUserInfo = () => ajax("get", "/api/account/my_info", {});
/*
 *
 * 修改用户个人信息接口
 * @param wechat
 * @param qq
 * @param address
 * @param nick_name
 * @param desc
 * @param gender
 * @param real_name
 * @param avatar
 * */
var updateUserInfo = (myData) => ajax("put", '/api/account/my_info', myData);
/**
 * 用户注销
 */
var logout = () => ajax("post", "/api/account/logout/", {});


/**
 * 判断登录状态
 */
var is_login = () => ajax("get", "/api/account/is_login/", {});

/*
 *
 * 判断验证码是否正确
 * @param phone_number
 * @param auth_code
 *
 * */
var isAuthCodeRight = (myData) => ajax("post", "/api/sms/verify_auth_sms", myData);
/*
 * 重置密码（忘记密码）
 * @param id
 * @param auth_code
 * @param phone_number
 *
 * */
var resetPassword = (myData) => ajax("post", "/api/account/reset_password", myData)

export {
  login,
  getSmsCode,
  register,
  logout,
  getUserInfo,
  is_login,
  isAuthCodeRight,
  updateUserInfo,
  resetPassword
}



