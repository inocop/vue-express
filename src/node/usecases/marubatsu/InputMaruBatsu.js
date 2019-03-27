const Game = require('../../entities/marubatsu/Game')

module.exports = class InputMaruBatsu {

  constructor(game, socketId, data) {
    if (!(game instanceof Game)) {
      throw new TypeError()
    }

    this.game = game
    this.socketId = socketId
    this.data = data
  }

  exec() {
    return new Promise((resolve, reject) => {
      if (!this._validateInput()) {
        return
      }

      if (this.game.setPlayData(this.socketId, this.data)) {
        resolve()
      }
    })
  }

  _validateInput() {
    // 2人いる状態でないと入力不可
    if (!(this.game.player1 && this.game.player2)){
      return false
    }

    // socketIdがplayer1 or player2と一致すること
    //if (![this.player1, this.player2].filter(p => p != null).includes(socketId))
    if (!(this.socketId === this.game.player1 || this.socketId === this.game.player2)) {
      return false
    }

    // 連続での入力不可
    if (this.game.lastInputPlayer === this.socketId) {
      return false
    }

    return true
  }
}