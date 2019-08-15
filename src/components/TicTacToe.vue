<template>
  <div class="game-content">
    <div class="gameInfo">
      <div class="form" v-show="symbols !== 'full'">
        <input type="text" placeholder="Name" v-model="playerRegister.name">
        <button v-for="(sym, index) in symbols" :key="index" @click="symChosen(sym)"
        :class="{'symBtnActive' : playerRegister.symbol === sym}" class="symBtn"
        >
          {{sym}}
        </button>
        <button @click="createUser">Crear</button>
      </div>
      <div class="board">

        <div v-if="msg.length > 1" style="margin-top: 2rem; font-size: 14px;">{{msg}}</div>

        <div class="">
          <h2 v-if="players[0]">{{players[0].name}}</h2>
          <h2 v-if="players[1]">{{players[1].name}}</h2>
        </div>
      </div>
    </div>
    <div class="tictac grid">
      <div class="A1 grat" @click.self="paint('A', '0', turn)">
        <span>{{tictacFrame.A[0]}}</span>
      </div>
      <div class="A2 grat" @click.self="paint('A', '1', turn)">
        <span>{{tictacFrame.A[1]}}</span>
      </div>
      <div class="A3 grat" @click.self="paint('A', '2', turn)">
        <span>{{tictacFrame.A[2]}}</span>
      </div>
      <div class="B1 grat" @click.self="paint('B', '0', turn)">
        <span>{{tictacFrame.B[0]}}</span>
      </div>
      <div class="B2 grat" @click.self="paint('B', '1', turn)">
        <span>{{tictacFrame.B[1]}}</span>
      </div>
      <div class="B3 grat" @click.self="paint('B', '2', turn)">
        <span>{{tictacFrame.B[2]}}</span>
      </div>
      <div class="C1 grat" @click.self="paint('C', '0', turn)">
        <span>{{tictacFrame.C[0]}}</span>
      </div>
      <div class="C2 grat" @click.self="paint('C', '1', turn)">
        <span>{{tictacFrame.C[1]}}</span>
      </div>
      <div class="C3 grat" @click.self="paint('C', '2', turn)">
        <span>{{tictacFrame.C[2]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
class User {
  constructor(name, symbol, ranking) {
    this.name = name;
    this.symbol = symbol;
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
      players: [],
      playerRegister: {
        name: '',
        symbol: null
      },
      symbols: ['X', 'O'],
      turn: 0, //turn 0 = first player \ turn 1 = second player
      tictacFrame: {
        A: ['', '', ''],
        B: ['', '', ''],
        C: ['', '', '']
      },
      msg: '',
      gameStat: 'OFF'
    }
  },
  created() {
    this.symChosen('X')
  },
  methods: {
    createUser() {
      let regexSpaces = /^\S+(?: \S+)*$/;

      if(this.players.length < 2 && this.playerRegister.name.match(regexSpaces)) {

        let newUser = new User(this.playerRegister.name, this.playerRegister.symbol, {win: 0, losses: 0})

        this.players.push(newUser);
        this.playerRegister.name = '';

        this.symbols.splice(this.symbols.indexOf(this.playerRegister.symbol), 1)
      } 
      else {
        this.msg = 'Por favor introduzca un nombre sin espacios'
        setTimeout(() => {
          this.msg = ''
        }, 1500)
      }

    },
    symChosen(sym) {
      this.playerRegister.symbol = sym
    },
    paint(letter, number, turnOfPlayer) {

      if(this.gameStat === 'ON') {

        let playerSymbol = this.players[turnOfPlayer].symbol;
        let square = this.tictacFrame[letter];

        this.$set(square, number, playerSymbol)
        this.changeTurn()

      }

    },
    changeTurn() {
      switch(this.turn) {
        case 0:
          this.turn = 1;
          break;
        case 1:
          this.turn = 0;
      }
    }
  },
  watch: {
    symbols() {
      if(this.symbols.length === 0) {
        this.symbols = 'full'
      }
    },
    players() {
      if(this.players.length > 1) {
        this.gameStat = 'ON'
      }
    }
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
  .grat {
    width: 100%;
    height: 100%;
    border: 0.5px solid black;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      position: absolute;
      font-size: 24px;
    }
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
.symBtn {
  outline: none;
}
.symBtnActive {
  background: green;
}
</style>