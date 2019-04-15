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

      if (this.gameRooms.length === 0) {
        game.id = 0
      }
      else {
        game.id = Math.max(...this.gameRooms.map((r) => r.id)) + 1
      }
      this.gameRooms.push(game)
      resolve()
    })
  }

  getRoom(roomId) {
    const index = this.gameRooms.findIndex((r) => r.id === roomId)
    return this.gameRooms[index]
  }

  getRoomNameList() {
    return Object.keys(this.gameRooms).map(id => this.gameRooms[id].params)
  }

  deleteRoom(roomId) {
    const deleteIndex = this.gameRooms.findIndex((r) => r.id === roomId)
    this.gameRooms.splice(deleteIndex, 1)
  }
}