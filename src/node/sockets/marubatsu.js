
const Game = require('../models/marubatsu/game');

module.exports = function(io) {

  const gameRooms = [];

  var marubatsu_socket = io.of('/marubatsu/')
  marubatsu_socket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    // ルーム作成
    socket.on('CREATE_ROOM', (data) => {
      console.log("CREATE_ROOM");
      console.log(`posted[name:${ data.name }]`)

      // 10部屋以上は作成しない
      if (gameRooms.length >= 10) {
        marubatsu_socket.to(socket.id).emit('CREATE_ROOM_RECEIVER', { message: "10部屋以上は作成できません" })
        return
      }

      game = new Game(gameRooms.length, data.name)
      gameRooms[game.id] = game

      marubatsu_socket.emit('CREATE_ROOM_RECEIVER', null, game.params)
    })

    // ルーム一覧取得
    socket.on('GET_ROOMS', (callback) => {
      console.log("GET_ROOMS");
      callback(null, Object.keys(gameRooms).map(id => gameRooms[id].params))
    })

    // マルバツルーム入室
    socket.on('GET_ROOM_DETAIL', (roomId, callback) => {
      console.log("GET_ROOM_DETAIL");
      targetRoom = gameRooms[roomId]

      if (targetRoom.player1 && targetRoom.player2) {
        callback({ message: "入室できません。" }, null)
        return
      }
      targetRoom.setPlayer(socket.id)

      socket.join(`playroom_${roomId}`);
      callback(null, targetRoom.playdata)
    })

    // マルバツ送信
    socket.on('POST_ROOM_DETAIL', (roomId, data) => {
      console.log("POST_ROOM_DETAIL");
      targetRoom = gameRooms[roomId]

      if (targetRoom.checkPlayer(socket.id)) {
        targetRoom.setPlayData(data)
        marubatsu_socket.in(`playroom_${roomId}`).emit('POST_ROOM_DETAIL_RECEIVER', data)
      }
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