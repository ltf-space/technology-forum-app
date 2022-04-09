import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant ,{ Lazyload,ImagePreview } from 'vant';
import 'vant/lib/index.css'
import * as echarts from 'echarts';
//使用echarts
Vue.use(echarts) 
//使用vant
Vue.use(Vant)
// 注册时设置`lazyComponent`选项
Vue.use(Lazyload);
Vue.prototype.imagePreview = ImagePreview
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
