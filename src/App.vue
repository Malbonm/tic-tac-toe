<template>
  <div id="app">
    <div class="game-content">
      <TicTacToe></TicTacToe>
    </div>
  </div>
</template>

<script>
import TicTacToe from './components/TicTacToe.vue'

export default {
  name: 'app',
  components: {
    TicTacToe,
  },
  created() {
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body, html {
  margin: 0;
}
#app {
  width: 100%;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.game-content {
  min-width: 300px;
  max-width: 600px;
}
</style>
