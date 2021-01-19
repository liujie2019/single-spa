import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false;

const appOptions = {
  el: '#child-vue-spa', // 挂载到父应用中id为child-vue-spa的标签中
  router,
  render: (h) => h(App),
};

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});

if (window.singleSpaNavigate) {
  // 动态设置子应用publicPath
  __webpack_public_path__ = 'http://localhost:8089/';
}

// 子应用独立开发部署
if (!window.singleSpaNavigate) {
  delete appOptions.el;
  new Vue(appOptions).$mount('#app');
}

// 子应用接入协议，主应用会调用这几个方法
// 子应用必须导出 以下生命周期 bootstrap、mount、unmount
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;
