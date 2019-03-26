const Game = require('./game');

module.exports = class GameRooms {

  constructor() {
    this.gameRooms = [];
  }

  addRoom(game) {
    return new Promise((resolve, reject) => {
      if (!(game instanceof Game)) {
        reject(new TypeError())
      }
      if (this.gameRooms.length >= 10) {
        reject(new RangeError("10部屋以上は作成できません" ))
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