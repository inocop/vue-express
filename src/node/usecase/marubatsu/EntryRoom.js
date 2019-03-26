const Game = require('../../models/marubatsu/Game');
const GameRooms = require('../../models/marubatsu/GameRooms');

module.exports = class EntryRoom {

  constructor(game, socket_id) {
    this.game = game
    this.socket_id = socket_id
  }

  exec() {
    return new Promise((resolve, reject) => {
      if (!(game instanceof Game)) {
        reject(new TypeError())
        return
      }
      if (game.player1 && game.player2) {
        reject(new Error("入室できません。"))
        return
      }

      game.setPlayer(this.socket_id)
      resolve()
    })
  }

}