const Game = require('./Game');

module.exports = class GameRooms {

  constructor() {
    this.gameRooms = [];
  }

  addRoom(game) {
    return new Promise((resolve, reject) => {
      if (!(game instanceof Game)) return

      if (this.gameRooms.length >= 10) {
        reject(new Error("10部屋以上は作成できません" ))
        return
      }

      game.id = this.gameRooms.length
      this.gameRooms.push(game)
      resolve()
    })
  }

  getRoom(index) {
    return this.gameRooms[index]
  }

  getRoomNameList() {
    return Object.keys(this.gameRooms).map(id => this.gameRooms[id].params)
  }

  deleteRoom(index) {
    this.gameRooms.splice(index, 1)
  }
}