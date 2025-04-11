import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log('router.beforeEach 开始执行'); // 确认是否进入 beforeEach
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  console.log('hasToken:', hasToken); // 检查是否有 token

  if (hasToken) {
    console.log('用户已登录'); // 确认是否进入已登录逻辑
    if (to.path === '/login') {
      console.log('已登录，重定向到首页'); // 确认是否进入重定向逻辑
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
      // const hasGetUserInfo = store.getters.name;
      // console.log('store',store)
      // console.log('store.getters.name:', store.getters.name);
      // console.log('store.getters:', store.getters);
      // console.log('hasGetUserInfo:', hasGetUserInfo); // 检查是否已获取用户信息
      // if (hasGetUserInfo) {
      //   console.log('已获取用户信息，直接放行'); // 确认是否直接放行
      //   next();
      // } else {
      //   try {
      //     console.log('尝试获取用户信息'); // 确认是否进入获取用户信息逻辑
      //     await store.dispatch('user/getInfo');
      //     next();
      //   } catch (error) {
      //     console.log('获取用户信息失败，重置 token 并跳转到登录页'); // 确认是否进入错误处理逻辑
      //     await store.dispatch('user/resetToken');
      //     Message.error(error || 'Has Error');
      //     next(`/login?redirect=${to.path}`);
      //     NProgress.done();
      //   }
      // }
    }
  } else {
    console.log('用户未登录'); // 确认是否进入未登录逻辑
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('路径在白名单中，直接放行'); // 确认是否进入白名单逻辑
      next();
    } else {
      console.log('路径不在白名单中，跳转到登录页'); // 确认是否进入跳转登录页逻辑
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
