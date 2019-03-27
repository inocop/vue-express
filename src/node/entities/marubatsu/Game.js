const Const = require('../../../common/consts/MarubatsuConst');
const GameState = require('./GameState');

module.exports = class Game {

  constructor (name) {
    this.id          = null
    this.name        = name
    this.player1     = null
    this.player2     = null
    this.maru_player = null
    this.playdata    = []
    this.gameState   = new GameState()
  }

  get params(){
    return { id: this.id, name: this.name }
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

  setPlayData(socketId, data) {
    // 初回入力したプレイヤーを〇とする
    if (this.gameState.state === Const.STATE_STANDBY) {
      this.gameState.start()

      if (socketId == this.player1) {
        this.maru_player = this.player1
      } else {
        this.maru_player = this.player2
      }
    }

    //this.playdata = [...this.playdata, data]
    return this.gameState.addInput({y: data.y, x: data.x, value: data.value})
  }
}