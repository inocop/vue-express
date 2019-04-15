const Const = require('../../../common/consts/GameConst');
const GameState = require('./GameState');

module.exports = class Game {

  constructor (name) {
    this.id         = null
    this.name       = name
    this.player1    = null
    this.player2    = null
    this.maruPlayer = null
    this.gameState  = new GameState()
    this.lastInputPlayer = null
  }

  get params(){
    return { id: this.id,
             name: this.name,
             playerCount: [this.player1, this.player2].filter(p => p != null).length
           }
  }

  get isGameEnd(){
    return Const.STATE_END(this.gameState.state)
  }

  setPlayer(socketId) {
    if (!this.player1) {
      this.player1 = socketId
    }
    else if (this.player1 !== socketId) {
      this.player2 = socketId
    }
  }

  getPlayData(){
    return JSON.stringify(this.gameState.inputMap)
  }

  setPlayData(socketId, data) {
    // 初回入力したプレイヤーを〇とする
    if (this.gameState.state === Const.STATE_STANDBY) {
      this.gameState.start()

      if (socketId === this.player1) {
        this.maruPlayer = this.player1
      }
      else {
        this.maruPlayer = this.player2
      }
    }

    let value = (socketId === this.maruPlayer) ? "maru" : "batsu"
    if (this.gameState.addInput({y: data.y, x: data.x, value: value})) {
      this.lastInputPlayer = socketId
      return true
    }

    return false
  }
}