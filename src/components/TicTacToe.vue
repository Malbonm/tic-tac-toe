<template>
  <div>
    <div class="game-board">
      <div class="game-board__register" v-show="marks !== 'full'">
        <input type="text" placeholder="Name" v-model="playerData.name">
        <button v-for="(mark, index) in marks" :key="index" @click="markSelected(mark)"
        :class="{'symBtnActive' : playerData.mark === mark}" class="symBtn"
        >
          {{mark}}
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
            <h2>{{this.players[turn].mark}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="tictactoe-grid">
      <div class="A1 grat" @click.self="toMark('A', '0', turn)">
        <span>{{tictacBoard.A[0]}}</span>
      </div>
      <div class="A2 grat" @click.self="toMark('A', '1', turn)">
        <span>{{tictacBoard.A[1]}}</span>
      </div>
      <div class="A3 grat" @click.self="toMark('A', '2', turn)">
        <span>{{tictacBoard.A[2]}}</span>
      </div>
      <div class="B1 grat" @click.self="toMark('B', '0', turn)">
        <span>{{tictacBoard.B[0]}}</span>
      </div>
      <div class="B2 grat" @click.self="toMark('B', '1', turn)">
        <span>{{tictacBoard.B[1]}}</span>
      </div>
      <div class="B3 grat" @click.self="toMark('B', '2', turn)">
        <span>{{tictacBoard.B[2]}}</span>
      </div>
      <div class="C1 grat" @click.self="toMark('C', '0', turn)">
        <span>{{tictacBoard.C[0]}}</span>
      </div>
      <div class="C2 grat" @click.self="toMark('C', '1', turn)">
        <span>{{tictacBoard.C[1]}}</span>
      </div>
      <div class="C3 grat" @click.self="toMark('C', '2', turn)">
        <span>{{tictacBoard.C[2]}}</span>
      </div>
    </div>
    <Modal v-if="winner" :name="winner" :reset="resetGame">
      <button @click="resetGame(turn)">Reiniciar</button>
    </Modal>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import {checkingResult} from '@/functions/checkResults.js';
import Modal from './Modal';

class Player {
  constructor(name, mark, ranking) {
    this.name = name;
    this.mark = mark;
    this.ranking = {
      win: 0,
      losses: 0
    },
    this.historyMoves = []
  }
}

export default {
  name: 'TicTacToe',
  components: {
    Modal
  },
  data() {
    return {
      players: [],
      playerData: {
        name: '',
        mark: null
      },
      marks: ['X', 'O'],
      turn: 0, //turn 0 = first player \ turn 1 = second player
      tictacBoard: {
        A: ['', '', ''],
        B: ['', '', ''],
        C: ['', '', '']
      },
      msg: '', // display message when a player is registered incorretly
      gameStat: 'OFF',
      winner: '',
      showModal: false
    }
  },
  created() {
    this.markSelected('X')
  },
  methods: {
    createUser() {
      let regexSpaces = /^\S+(?: \S+)*$/;

      if(this.players.length < 2 && this.playerData.name.match(regexSpaces) && this.playerData.mark) {

        let { name, mark } = this.playerData
        let player = new Player(name, mark, {win: 0, losses: 0})

        this.players.push(player);
        this.playerData.name = '';

        this.marks.splice(this.marks.indexOf(this.playerData.mark), 1)
        this.playerData.mark = null;
      }
      //if there aren't two players or player name doesn't exist
      else {
        this.msg = 'Por favor introduzca un nombre sin espacios y eliga una marca'
        setTimeout(() => {
          // after a time msg disappear
          this.msg = ''
        }, 1500)
      }

    },
    markSelected(mark) {
      this.playerData.mark = mark
    },
    toMark(letter, number, turnOfPlayer) {

      if(this.gameStat === 'ON') {
        
        let currentPlayer = this.players[turnOfPlayer]
        let rowArray = this.tictacBoard[letter];
        let gridSquare = this.tictacBoard[letter][number]

        //checking if is a empty square
        if(!gridSquare) {
          
          currentPlayer.historyMoves.push(`${letter+number}`)
          this.$set(rowArray, number, currentPlayer.mark)
          let result = checkingResult(currentPlayer)
          // console.log('hola')
          if(result) {
            currentPlayer.ranking.win += 1
            this.winner = currentPlayer.name
            this.players.forEach(player => {
              player.historyMoves = []
            })
            
            console.log(`${currentPlayer.name} ha ganado!`)
          }
          else {
            this.changeTurn()
            console.log(this.tictacBoard.A.length)
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
    },
    resetGame(turn) {
      let newTictacBoard = {
        A: ['', '', ''],
        B: ['', '', ''],
        C: ['', '', '']
      }
      this.tictacBoard = newTictacBoard;
      this.winner = '';
      turn === 0 ? this.turn = 1 : this.turn = 0
      // this.tictacBoard = Object.assign({}, newTictacBoard);
      console.log('se hizo reset')
    }
  },
  watch: {
    marks() {
      if(this.marks.length === 0) {
        this.marks = 'full';
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
  width: 300px;
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