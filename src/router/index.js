/*
 * 路由表
 * */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "store/index";
import {ACTION_GET_USERINFO} from "store/type";

const Home = resolve => require(['page/home/home'], resolve)
const User = resolve => require(['page/user/user'], resolve)
const Login = resolve => require(['page/user/children/login'], resolve)
const Reg = resolve => require(['page/user/children/reg'], resolve)
const Reset = resolve => require(['page/user/children/reset'], resolve)
const Profile = resolve => require(['page/profile/profile'], resolve)
const notFound = resolve => require(['page/errorPage/notFound'], resolve);
const serverError = resolve => require(['page/errorPage/serverError'], resolve);

Vue.use(VueRouter);//创建路由实例

const routes = [
  {
    path: '/', redirect: '/home', //自动转跳到home
  },

  {
    path: '/home', component: Home,
    meta: {title: "YMALL-主页"}
  },
  {
    path: '/user',
    component: User,
    redirect: "/user/login",
    children: [
      {
        path: 'login',// /login相当于在Page路径下的页面，login相当于在当前页面的相对路径
        component: Login,
        meta: {title: "YMALL-用户登陆"}
      },
      {
        path: 'reg',
        component: Reg,
        meta: {title: "YMALL-用户注册"}
      },
      {
        path: 'reset',
        component: Reset,
        meta: {title: "YMALL-密码重置"}
      }
    ]
  },
  {
    path: '/profile',
    component: Profile,
    meta: {requireAuth: true, title: "YMALL-个人中心"},  // 添加该字段，表示进入这个路由是需要登录的
  },

  {"path": "/404", component: notFound, meta: {title: "404页面找不到"}},
  {"path": "/500", component: serverError, meta: {title: "服务器错误"}},
  {"path": "*", redirect: "/404", meta: {title: "404页面找不到"}},
];


//返回路由实例
const router = new VueRouter({
  routes,
  mode: 'history', //html5 模式去除锚点
  saveScrollPosition: false, //记住页面的滚动位置 html5模式适用
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  strict: process.env.NODE_ENV !== 'production'//严格模式，发布阶段关闭它避免性能损耗
});


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("is_login") === "true") {  // 通过localStorage获取当前的is_login是否存在
      next();
    }
    else {
      next({
        path: '/user/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});
router.afterEach((to, from) => {
  document.title = to.meta.title;
})
router.onReady(() => {
  //console.log("first")//手输+第一次进入路由器的时候被调用
  store.dispatch(ACTION_GET_USERINFO); //刷新进行权限认证,并重新获取用户信息
})
export default router;
