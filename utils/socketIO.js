const jwt = require('jsonwebtoken');
const users = require('../models/user');
const reviews = require('../models/review');
module.exports =async function (io) {
    io.on('connection', (socket) => {
        console.log('user is accessing: ' + socket.id);
        socket.on('disconnect', () => {
            console.log('socket:' + socket.id + ' disconnected!!!!!!!')
        })
        socket.on('connection', (data) => {
            socket.join(data)    // When user connect --> push user to room( each route product is 1 room)
            console.log('connection: ' + socket.id + ' join ' + data)
            console.log(socket.adapter.rooms);
        
        })
        socket.on('sendData',async  function (data) {
            
            if (data.token) {
                const token = data.token;
                const {userId} = await jwt.verify(token, process.env.SECRET_KEY)
                const user = await users.findOne({ _id: userId }).lean()
                if (user) {
                    socket.join(data.link)
                    let reviewContent = await data.reviewContent;
                    let avatar = await user.avatar;
                    let fullname = await user.fullname || user.email;
                    await reviews.create({
                        user: userId,
                        book: data.link,
                        content: data.reviewContent,
                    })
                    return io.sockets.in(data.link).emit('sendData', {avatar, fullname, reviewContent}) // Send data to room data.link
                }
                const error = new Error();
                error.status = 404;
                error.message = 'User no found!'
                return error;
            }
            socket.emit('sendData')
        })
    })
}