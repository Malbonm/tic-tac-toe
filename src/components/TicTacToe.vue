<template>
  <div class="game-content">
    <div class="gameInfo">
      <div class="form">
        <input type="text" placeholder="Name" v-model="user.name">
        <button @click="createUser">Crear</button>
      </div>
      <div class="board">
        <div class="">
          <h2 v-if="users[0]">{{users[0].name}}</h2>
          <h2 v-if="users[1]">{{users[1].name}}</h2>
        </div>
      </div>
    </div>
    <div class="tictac grid">
      <div class="A1 grat" @click="paint(letter)"></div>
      <div class="A2 grat" @click="paint(letter)"></div>
      <div class="A3 grat" @click="paint(letter)"></div>
      <div class="B1 grat" @click="paint(letter)"></div>
      <div class="B2 grat" @click="paint(letter)"></div>
      <div class="B3 grat" @click="paint(letter)"></div>
      <div class="C1 grat" @click="paint(letter)"></div>
      <div class="C2 grat" @click="paint(letter)"></div>
      <div class="C3 grat" @click="paint(letter)"></div>
    </div>
  </div>
</template>

<script>
class User {
  constructor(name, ranking) {
    this.name = name;
    this.ranking = {
      win: 0,
      losses: 0
    }
  }
  showRanking() {
    return this.ranking;
  }
}
export default {
  name: 'TicTacToe',
  data() {
    return {
      users: [],
      user: {
        name: ''
      },
      turn: '',
      tictacFrame: {
        A: ['', '', ''],
        B: ['', '', ''],
        C: ['', '', '']
      }
    }
  },
  methods: {
    createUser() {
      if(this.users.length < 2) {
        let newUser = new User(this.user.name, {win: 0, losses: 0})
        this.users.push(newUser);
        this.user.name = '';
      } else {
        this.user.name = '';
        console.log('Lista de usuarios completa')
      }
    }
  },
  created() {
    console.log(this.num)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.grid {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template: 33.33% 33.33% 33.33%;
  // padding: 10px;
  // grid-gap: 7px;
  .grat {
    width: 100%;
    height: 100%;
    border: 0.5px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.gameInfo {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  .form {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: flex-start;
    input[type=text], select {
      width: 50%;
      height: 100%;
      font-size: 14px;
      padding: 5px;
      outline: none;
      border: 0.5px solid #999;
      box-sizing: border-box;
    }
  }
  .board {
    height: 80%;
  }
}
</style>