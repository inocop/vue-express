
const Game = require('../models/marubatsu/game');
const GameRooms = require('../models/marubatsu/GameRooms');

module.exports = function(io) {

  const gameRooms = new GameRooms;

  var marubatsu_socket = io.of('/marubatsu/')
  marubatsu_socket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    // ルーム作成
    socket.on('CREATE_ROOM', (data) => {
      console.log("CREATE_ROOM");
      console.log(`posted[name:${ data.name }]`)

      game = new Game(data.name)
      gameRooms.addRoom(game)
      .then(() => {
        marubatsu_socket.emit('CREATE_ROOM_RECEIVER', null, game.params)
      })
      .catch((error) => {
        if (error instanceof RangeError) {
          marubatsu_socket.to(socket.id).emit('CREATE_ROOM_RECEIVER', error)
        }
      })
    })

    // ルーム一覧取得
    socket.on('GET_ROOMS', (callback) => {
      console.log("GET_ROOMS");
      callback(null, gameRooms.getRoomNameList())
    })

    // マルバツルーム入室
    socket.on('GET_ROOM_DETAIL', (roomId, callback) => {
      console.log("GET_ROOM_DETAIL");

      targetRoom = gameRooms.getRoom(roomId)
      new EntryRoom(targetRoom, socket.id).exec()
      .then(() => {
        socket.join(`playroom_${roomId}`);
        callback(null, targetRoom.playdata)
      })
      .catch((error) => {
        if (error.message) callback(error, null)
      })
    })

    // マルバツ送信
    socket.on('POST_ROOM_DETAIL', (roomId, data) => {
      console.log("POST_ROOM_DETAIL");
      targetRoom = gameRooms.getRoom(roomId)
      if (!targetRoom) return

      targetRoom.setPlayData(socket.id, data, () => {
        marubatsu_socket.in(`playroom_${roomId}`).emit('POST_ROOM_DETAIL_RECEIVER', data)
      })
    })

    // マルバツルーム退出
    socket.on('LEAVE_PLAY_ROOM', () => {
      console.log("LEAVE_PLAY_ROOM");

      var joinRooms = marubatsu_socket.adapter.sids[socket.id];
      for (var roomId in joinRooms) {
        if (roomId && roomId.startsWith('playroom_')) {
          socket.leave(roomId);
        }
      }
    })

  });
}