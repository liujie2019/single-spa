import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { registerApplication, start } from 'single-spa';

Vue.config.productionTip = false;

async function loadScript(url) {
  return new Promise((resovle, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resovle;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

registerApplication(
  'singleVue',
  async () => {
    console.log('加载子应用');
    await loadScript('http://localhost:8089/js/chunk-vendors.js');
    await loadScript('http://localhost:8089/js/app.js');
    return window.singleVue;
  },
  (location) => location.pathname.startsWith('/vue') // 当用户切换到vue路径时加载
);

start();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
