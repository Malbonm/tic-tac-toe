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
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
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
  height: calc(var(--vh, 1vh) * 100);
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
  width: 100%;
}
</style>
