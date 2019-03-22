const GameState = require('./game-state');

module.exports = class Game {

  constructor (id, name) {
    this.id        = id
    this.name      = name
    this.player1   = null
    this.player2   = null
    this.playdata  = []
    this.gameState = new GameState()
  }

  get params(){
    return { id: this.id, name: this.name }
  }

  get state(){
    return this.gameState.state
  }

  setPlayer(socketId) {
    if (!this.player1) {
      this.player1 = socketId
    }
    else if (this.player1 !== socketId) {
      this.player2 = socketId
    }
  }

  setPlayData(socketId, data, callback) {
    //if (![this.player1, this.player2].filter(p => p != null).includes(socketId))
    if (socketId !== this.player1 && socketId !== this.player2) {
      return
    }

    this.playdata = [...this.playdata, data]
    this.gameState.addInput({y: data.y, x: data.x, value: data.value})
    callback()
  }
}