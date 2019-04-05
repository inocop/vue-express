
const Const = require('../../common/consts/MarubatsuConst')
const Game = require('../entities/marubatsu/Game')
const GameRooms = require('../entities/marubatsu/GameRooms')
const EntryRoom = require('../usecases/marubatsu/EntryRoom')
const InputMaruBatsu = require('../usecases/marubatsu/InputMaruBatsu')

module.exports = function(io) {

  const gameRooms = new GameRooms

  var marubatsuSocket = io.of('/marubatsu/')
  marubatsuSocket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    // ルーム作成
    socket.on(Const.SOCKET_CREATE_ROOM, (data) => {
      console.log(Const.SOCKET_CREATE_ROOM);
      console.log(`posted[name:${ data.name }]`)

      game = new Game(data.name)
      gameRooms.addRoom(game)
      .then(() => {
        marubatsuSocket.emit(Const.SOCKET_CHANGE_ROOMS_EVENT, null, game.params)
      })
      .catch((error) => {
        marubatsuSocket.to(socket.id).emit(Const.SOCKET_CHANGE_ROOMS_EVENT, { message: error.message })
      })
    })

    // ルーム一覧取得
    socket.on(Const.SOCKET_GET_ROOMS, (callback) => {
      console.log(Const.SOCKET_GET_ROOMS);
      callback(null, gameRooms.getRoomNameList())
    })

    // マルバツルーム入室
    socket.on(Const.SOCKET_ENTRY_GAME, (roomId, callback) => {
      console.log(Const.SOCKET_ENTRY_GAME);

      let targetRoom = gameRooms.getRoom(roomId)
      if (!targetRoom) return

      new EntryRoom(targetRoom, socket.id).exec()
      .then(() => {
        socket.join(`playroom_${roomId}`);
        callback(null, targetRoom.getPlayData())
      })
      .catch((error) => {
        callback({ message: error.message })
      })
    })

    // マルバツ送信
    socket.on(Const.SOCKET_INPUT_GAME, (roomId, data) => {
      console.log(Const.SOCKET_INPUT_GAME)

      let targetRoom = gameRooms.getRoom(roomId)
      if (!targetRoom) return

      new InputMaruBatsu(targetRoom, socket.id, data).exec()
      .then(() => {
        marubatsuSocket.in(`playroom_${roomId}`).emit(Const.SOCKET_CHANGE_GAME_STATE_EVENT, targetRoom.getPlayData())
      })
    })

    // マルバツルーム退出
    socket.on(Const.SOCKET_LEAVE_GAME, () => {
      console.log(Const.SOCKET_LEAVE_GAME)

      let joinRooms = marubatsuSocket.adapter.sids[socket.id];
      for (let roomId in joinRooms) {
        if (roomId && roomId.startsWith('playroom_')) {
          socket.leave(roomId);
        }
      }
    })

  });
}