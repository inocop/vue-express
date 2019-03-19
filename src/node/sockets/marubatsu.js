module.exports = function(io) {

  var rooms = [];
  var room_details = [];

  var marubatsu_socket = io.of('/marubatsu/')
  marubatsu_socket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    // ルーム作成
    socket.on('CREATE_ROOM', (data) => {
      console.log("CREATE_ROOM");
      console.log(`posted[name:${ data.name }]`)

      room = { id: rooms.length, name: data.name }
      rooms.push(room)
      marubatsu_socket.emit('CREATE_ROOM_RECEIVER', room)
    })

    // ルーム一覧取得
    socket.on('GET_ROOMS', (callback) => {
      console.log("GET_ROOMS");
      callback(null, rooms)
    })

    // マルバツルーム入室
    socket.on('GET_ROOM_DETAIL', (room_id, callback) => {
      console.log("GET_ROOM_DETAIL");

      socket.join(`playroom_${room_id}`);
      if (room_details[room_id]) {
        callback(null, room_details[room_id])
      }
    })

    // マルバツ送信
    socket.on('POST_ROOM_DETAIL', (room_id, data) => {
      console.log("POST_ROOM_DETAIL");

      if (!room_details[room_id]) room_details[room_id] = []

      room_details[room_id] = [...room_details[room_id], data]
      marubatsu_socket.in(`playroom_${room_id}`).emit('POST_ROOM_DETAIL_RECEIVER', data)
    })

    // マルバツルーム退出
    socket.on('LEAVE_PLAY_ROOM', () => {
      console.log("LEAVE_PLAY_ROOM");

      var rooms = marubatsu_socket.adapter.sids[socket.id];
      for (var room_id in rooms) {
        if (room_id && room_id.startsWith('playroom_')) {
          socket.leave(room_id);
        }
      }
    })

  });
}