<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>父组件->子组件的props属性：{{msgFromFather}}</h2>
    <input v-model="msgFromChildren"/>
    <button v-on:click="onClickMe">子组件->父组件($emit)</button>
    <button v-on:click="onClickDispatch">子组件->父组件($dispatch)</button>
    <hr>
    <input v-model="newTodoText"/>
    <button v-on:click="addTodo">添加</button>
    <button v-on:click="deleteTodo(newTodoText)">删除</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello from component a!',
      msgFromChildren: '',
      newTodoText: ''
    }
  },
  props: ['msgFromFather'],
  methods: {
    onClickMe: function () {
      // console.log(this.msgFromFather)
      this.$emit('children-tell-me-something', this.msgFromChildren)
    },
    onClickDispatch: function () {
      console.log('Vue 1.0升级到2.0中去除了$broadcast和$dispatch方法!')
      // Vue 1.0升级到2.0中去除了$broadcast和$dispatch方法。
      // this.$dispatch('children-tell-me-dispatch', this.msgFromChildren)
    },
    addTodo: function () {
      console.log(this.newTodoText)
      // this.$emit('add-todo', { label: this.newTodoText, isFinished: false })
      // 事件中心bus
      this.$bus.emit('add-todo', { label: this.newTodoText, isFinished: false })
      this.$bus.emit('once')
      this.newTodoText = ''
    },
    deleteTodo: function (id) {
      console.log(id)
      // this.$emit('delete-todo', id)
      this.$bus.emit('delete-todo', id)
      this.newTodoText = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color: #42b983;
  font-weight: normal;
}
</style>
