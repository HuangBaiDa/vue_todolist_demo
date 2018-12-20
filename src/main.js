// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 以下注释表示此处new的vue无需赋值给一个变量，跳过new的新对象赋值机制
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // （此处相当于router:"router"）实例化一个变量
  router,
  // 显示的组件注册
  components: { App },
  // 显示的模板
  template: '<App/>'
})
