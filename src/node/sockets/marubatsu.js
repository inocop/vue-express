module.exports = function(io) {

  var rooms = [];
  var room_details = [];

  var marubatsu_socket = io.of('/marubatsu/')
  marubatsu_socket.on('connection', (socket) => {
    console.log(`a user connected[id:${ socket.id }]`)

    socket.on('CREATE_ROOM', (data) => {
      console.log("CREATE_ROOM");
      console.log(`posted[name:${ data.name }]`)

      room = {
          id: rooms.length,
        name: data.name
      }
      rooms.push(room)
      marubatsu_socket.emit('CREATE_ROOM_RECEIVER', room)
    })

    socket.on('GET_ROOMS', (callback) => {
      console.log("GET_ROOMS");
      callback(null, rooms)
    })

    socket.on('GET_ROOM_DETAIL', (room_id, callback) => {
      console.log("GET_ROOM_DETAIL");

      socket.join(`playroom/${room_id}`);
      if (room_details[room_id]) {
        callback(null, room_details[room_id])
      }
    })

    socket.on('LEAVE_PLAY_ROOM', () => {
      var rooms = marubatsu_socket.adapter.sids[socket.id];
      console.log("LEAVE_PLAY_ROOM")
      console.log(JSON.stringify(rooms))

      for (var room_id in rooms) {
        if (room_id !== '' && room_id.startsWith('playroom/')) {
          socket.leave(room_id);
          console.log("leave room :" + room_id)
        }
      }
    })

    socket.on('POST_ROOM_DETAIL', (room_id, data) => {
      console.log("POST_ROOM_DETAIL");

      if (!room_details[room_id]) room_details[room_id] = []

      room_details[room_id] = [...room_details[room_id], data]
      marubatsu_socket.in(`playroom/${room_id}`).emit('POST_ROOM_DETAIL_RECEIVER', data)
    })
  });

}