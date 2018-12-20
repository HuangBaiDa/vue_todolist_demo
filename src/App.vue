<template>
  <div id="app">
    <h1>{{title}}</h1>
    <h2 v-text="title"></h2>
    <h3 v-html="title"></h3>
    <input v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="item in items" :key="item.label" v-bind:class="{finished: item.isFinished}" v-on:click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <p>children tells me: {{childrenWords}}</p>
    <component-a msgFromFather="I am father!" v-on:children-tell-me-something="listenToChildren"></component-a>

    <!--<component-a msgFromFather="I am father!" v-on:children-tell-me-something="listenToChildren" v-on:add-todo="addTodo" v-on:delete-todo="deleteTodo"></component-a>-->
  </div>
</template>

<script>
import Vue from 'vue'
import Storage from './storage'
import ComponentA from './components/componentA'
import VueBus from 'vue-bus'

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装 vue-bus
Vue.use(VueBus)
// export相当于  new Vue({});
export default {
  // 相当于 date: function(){} 下面是ES6语法 _vue-bus@1.2.0@vue-bus
  created () {
    console.log('生命周期')
    this.$bus.on('add-todo', this.addTodo)
    this.$bus.on('delete-todo', this.deleteTodo)
    this.$bus.once('once', () => console.log('这个监听器只会触发一次'))
  },
  beforeDestroy () {
    this.$bus.off('add-todo', this.addTodo)
    this.$bus.off('delete-todo', this.deleteTodo)
  },
  data () {
    return {
      title: '<span>渲染HTML</span> this is a todo list',
      items: Storage.fetch(),
      newItem: '',
      childrenWords: ''
    }
  },
  components: { ComponentA },
  watch: {
    items: {
      handler: function (items) {
        Storage.save(items)
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function (item) {
      console.log(item.isFinished = !item.isFinished)
    },
    addNew: function () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      console.log(this.newItem)
      this.newItem = ''
    },
    listenToChildren: function (msg) {
      // console.log(msg)
      this.childrenWords = msg
    },
    addTodo: function (newTodo) {
      console.log('add')
      console.log(newTodo)
      this.items.push(newTodo)
    },
    deleteTodo: function (todoId) {
      console.log('del')
      this.items = this.items.filter(function (todo) {
        return todo.label !== todoId
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.finished {
  text-decoration: underline;
}
</style>
