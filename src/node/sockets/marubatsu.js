module.exports = function(io) {

  var rooms = [];

  io.of('/marubatsu/').on('connection', function(socket) {
    console.log(`a user connected[id:${ socket.id }]`)

    socket.on('POST_MESSAGE', function(data) {
      console.log(`posted[name:${ data.name }, message:${ data.message }]`)
      socket.emit('MESSAGE', data)
    })

    socket.on('CREATE_ROOM', function(data) {
      console.log(`posted[name:${ data.name }]`)

      room = { name : data.name }
      rooms.push(room);

      socket.emit('CREATED', room)
    })

    socket.on('GET_ROOMS', function() {
      console.log(rooms);
      socket.emit('MESSAGE', rooms)
    })
  });

}