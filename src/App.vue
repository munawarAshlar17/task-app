<template>
  <div id="app">
    <HomePage></HomePage>
    <AddTodo></AddTodo>



  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import AddTodo from "./components/AddTodo";


export default {
  name: 'app',
  components: {
      AddTodo,

      HomePage,

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
</style>
