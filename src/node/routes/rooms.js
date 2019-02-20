
module.exports = function(io) {

  io.of('/rooms/').on('connection', function(socket) {
    console.log(`a user connected[id:${ socket.id }]`)

    socket.on('POST_MESSAGE', function(data) {
      console.log(`posted[name:${ data.name }, message:${ data.message }]`)
      socket.emit('MESSAGE', data)
    })
  });
}