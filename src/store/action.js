/**
 * Created by zc on 2017/3/18.
 * 全局异步逻辑处理
 */

import * as type from './type'
import {
  getUserInfo,
  login,
  logout,
  addCart,
  updateCartProductCount,
  deleteByProductId,
  deleteCartAllCheck,
  getCart,
  cartCheckALL,
  cartCheckSingle
} from "service/getData"
import router from "router/index"

export default {

  [type.ACTION_GET_USERINFO] ({commit}) {
    getUserInfo().then(response => {
      commit(type.RECORD_USERINFO, response.data);
      getCart().then(response => {
        commit(type.RECORD_CART, response.data);
      }, error => {
        console.log("获取购物车信息失败")
      });
    }, error => {
    });
  },
  async [type.ACTION_USER_LOGIN] ({commit}, user) {
    let response = await login(user);
    commit(type.RECORD_USERINFO, response.data);
    getCart().then(response => {
      commit(type.RECORD_CART, response.data);
    }, error => {
      console.log("获取购物车信息失败")
    });
  },
  [type.ACTION_USER_LOGOUT] ({commit}) {
    logout().then(response => {
      commit(type.CANCEL_USER);
      commit(type.CANCEL_CART);
      if (router.currentRoute.meta.requireAuth) {
        router.push({
          path: '/home',
          // query: {redirect: router.currentRoute.fullPath}
        })
      }
    }, error => {
      console.log(error.response)
    });
  },


  async [type.ADD_CART] ({commit},params) {
    let response = await addCart(params);
    commit(type.RECORD_CART, response.data);
  }



}
