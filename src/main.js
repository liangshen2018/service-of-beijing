// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './mint.js'
import './style/index.less'
import '@/font/iconfont.css'
import './common/rem'
import '@/permission'
// 放Vue.use(MintUI)前面
Vue.use(VueLazyload, {
  error: require('@/assets/images/error.jpg'),
  loading: require('@/assets/images/loading.gif')
})
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
