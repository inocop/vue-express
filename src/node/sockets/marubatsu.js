
const Room = require('../models/room');

module.exports = function(io) {

  const rooms = [];

  var marubatsu_socket = io.of('/marubatsu/')
  marubatsu_socket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    // ルーム作成
    socket.on('CREATE_ROOM', (data) => {
      console.log("CREATE_ROOM");
      console.log(`posted[name:${ data.name }]`)

      // 10部屋以上は作成しない
      if (rooms.length >= 10) {
        marubatsu_socket.to(socket.id).emit('CREATE_ROOM_RECEIVER', { message: "10部屋以上は作成できません" })
        return
      }

      room = new Room(rooms.length, data.name)
      rooms[room.id] = room

      marubatsu_socket.emit('CREATE_ROOM_RECEIVER', null, room.params)
    })

    // ルーム一覧取得
    socket.on('GET_ROOMS', (callback) => {
      console.log("GET_ROOMS");
      callback(null, Object.keys(rooms).map(id => rooms[id].params))
    })

    // マルバツルーム入室
    socket.on('GET_ROOM_DETAIL', (roomId, callback) => {
      console.log("GET_ROOM_DETAIL");
      targetRoom = rooms[roomId]

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
      targetRoom = rooms[roomId]

      if (targetRoom.checkPlayer(socket.id)) {
        targetRoom.setPlayData(data)
        marubatsu_socket.in(`playroom_${roomId}`).emit('POST_ROOM_DETAIL_RECEIVER', data)
      }
    })

    // マルバツルーム退出
    socket.on('LEAVE_PLAY_ROOM', () => {
      console.log("LEAVE_PLAY_ROOM");

      var rooms = marubatsu_socket.adapter.sids[socket.id];
      for (var roomId in rooms) {
        if (roomId && roomId.startsWith('playroom_')) {
          socket.leave(roomId);
        }
      }
    })

  });
}