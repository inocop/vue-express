const Game = require('../../entities/marubatsu/Game');

module.exports = class EntryRoom {

  constructor(game, socketId) {
    if (!(game instanceof Game)) {
      throw new TypeError()
    }

    this.game = game
    this.socketId = socketId
  }

  exec() {
    return new Promise((resolve, reject) => {
      if (this.game.player1 && this.game.player2) {
        reject(new Error("入室できません。"))
        return
      }

      this.game.setPlayer(this.socketId)
      resolve()
    })
  }

}