<template>
  <div>
    <div class="game-board">
      <div class="game-board__register" v-show="symbols !== 'full'">
        <input type="text" placeholder="Name" v-model="playerRegister.name">
        <button v-for="(sym, index) in symbols" :key="index" @click="symChosen(sym)"
        :class="{'symBtnActive' : playerRegister.symbol === sym}" class="symBtn"
        >
          {{sym}}
        </button>
        <button @click="createUser">Crear</button>
      </div>
      <div class="game-board__info">
        <div class="msgAlert" v-if="gameStat === 'OFF'" style="margin-top: 2rem;">
          {{msg}}
        </div>
        <div v-if="gameStat === 'ON'" class="player-board">
          <div class="player-board__descriptions">
            <div style="font-size: 24px; font-weight: 600;">{{players[0].name}}</div>
            <div style="font-size: 24px; font-weight: 600;">{{players[1].name}}</div>
          </div>
          <div class="player-board__stats">
            <div>
              <span style="font-size: 24px; font-weight: 600; margin-right: 10px;">{{this.players[0].ranking.win}}</span>
              <span style="font-size: 24px; font-weight: 600;">{{this.players[0].ranking.losses}}</span>
            </div>
            <div>
              <span style="font-size: 24px; font-weight: 600; margin-right: 10px;">{{this.players[1].ranking.win}}</span>
              <span style="font-size: 24px; font-weight: 600;">{{this.players[1].ranking.losses}}</span>
            </div>
          </div>
          <div class="player-board__turn">
            <h2>{{this.players[turn].symbol}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="tictactoe-grid">
      <div class="A1 grat" @click.self="paint('A', '0', turn)">
        <span>{{tictacBoard.A[0]}}</span>
      </div>
      <div class="A2 grat" @click.self="paint('A', '1', turn)">
        <span>{{tictacBoard.A[1]}}</span>
      </div>
      <div class="A3 grat" @click.self="paint('A', '2', turn)">
        <span>{{tictacBoard.A[2]}}</span>
      </div>
      <div class="B1 grat" @click.self="paint('B', '0', turn)">
        <span>{{tictacBoard.B[0]}}</span>
      </div>
      <div class="B2 grat" @click.self="paint('B', '1', turn)">
        <span>{{tictacBoard.B[1]}}</span>
      </div>
      <div class="B3 grat" @click.self="paint('B', '2', turn)">
        <span>{{tictacBoard.B[2]}}</span>
      </div>
      <div class="C1 grat" @click.self="paint('C', '0', turn)">
        <span>{{tictacBoard.C[0]}}</span>
      </div>
      <div class="C2 grat" @click.self="paint('C', '1', turn)">
        <span>{{tictacBoard.C[1]}}</span>
      </div>
      <div class="C3 grat" @click.self="paint('C', '2', turn)">
        <span>{{tictacBoard.C[2]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import {checkingFrame} from '@/functions/checkFrame.js'
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
      tictacBoard: {
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

      if(this.players.length < 2 && this.playerRegister.name.match(regexSpaces) && this.playerRegister.symbol) {

        let newUser = new User(this.playerRegister.name, this.playerRegister.symbol, {win: 0, losses: 0})

        this.players.push(newUser);
        this.playerRegister.name = '';

        this.symbols.splice(this.symbols.indexOf(this.playerRegister.symbol), 1)
        this.playerRegister.symbol = null;
      } 
      else {
        this.msg = 'Por favor introduzca un nombre sin espacios y eliga un simbolo'
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
        let rowArray = this.tictacBoard[letter];

        if(!this.tictacBoard[letter][number]) {
          
          this.$set(rowArray, number, playerSymbol)
          let result = checkingFrame(playerSymbol, this.tictacBoard)
          console.log(result)
          if(result) {
            console.log('ha ganado!')
          }
          else {
            this.changeTurn()
          }

        }

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
.tictactoe-grid {
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
.game-board {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  &__register {
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
  &__info {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    .msgAlert {
      font-size: 14px;
    }
    .player-board {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      &__descriptions {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        align-items: center;
        border: 1px solid red;
      }
      &__stats {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-items: center;
      }
      &__turn {
        height: 100%;
        display: grid;
        border: 1px solid red;
        align-items: center;
      }
    }
  }
}
.symBtn {
  outline: none;
}
.symBtnActive {
  background: green;
}
</style>