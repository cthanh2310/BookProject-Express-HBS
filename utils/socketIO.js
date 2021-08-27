const jwt = require('jsonwebtoken');
const users = require('../models/user');
const reviews = require('../models/review');
module.exports = async function (io) {
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
        socket.on('sendData', async function (data) {   // send data to server

            if (data.token) {
                const token = data.token;
                const { userId } = await jwt.verify(token, process.env.SECRET_KEY)
                const user = await users.findOne({ _id: userId }).lean()
                if (user) {
                    socket.join(data.link)
                    let reviewContent = await data.reviewContent;
                    let avatar = await user.avatar;
                    let fullname = await user.fullname || user.email;
                    let review = await reviews.create({
                        user: userId,
                        book: data.link,
                        content: data.reviewContent,
                    })
                        .then((review) => {
                            return review.toObject();
                        })
                    let reviewID = review._id;
                    return io.sockets.in(data.link).emit('sendData', { reviewID, avatar, fullname, reviewContent }) // Send data to room data.link
                }
                const error = new Error();
                error.status = 404;
                error.message = 'User no found!'
                return error;
            }
            socket.emit('sendData')
        })
        socket.on('focus', function (link) {  // if have anyone user focus to chat --> show message 'Co nguoi dang nhap' to other users
            socket.join(link)
            // return io.sockets.in(link).emit('focus');
            return socket.broadcast.to(link).emit('focus');
        })
        socket.on('blur', function (link) {  // opposite of above
            socket.join(link)
            return socket.broadcast.to(link).emit('blur');
        })
        socket.on('like', async function (data) {
            console.log(data);
            if (data.token) {
                const token = data.token;
                const { userId } = await jwt.verify(token, process.env.SECRET_KEY)
                if (userId) {
                    socket.join(data.link)
                    console.log(userId)
                    const review = await reviews.findOne({ _id: data.reviewID }).lean()
                    console.log(review)
                    // console.log(review.likes.includes(userId))
                    if(review.likes.indexOf({userId}) < 0){
                        review.likes.push({userId: userId});
                    } else {
                        review.likes.splice(review.likes.indexOf({userId}), 1)
                    }
                    console.log('new review: ', review);
                    await reviews.updateOne({ _id: data.reviewID}, {likes: review.likes}).lean()
                    /*  review.likes.forEach((like) => {
                        if(like == userId) {
                            reviews.updateOne({ _id: data.review},{
                                $pull: {
                                    likes: {
                                        _id: userId
                                    }
                                }
                            })
                            return io.socket.in(data.link).emit('link', 'liked');
                        }

                    }) */
                }
                const error = new Error();
                error.status = 404;
                error.message = 'User no found!'
                return error;
            }
            socket.emit('like');
        })
    })
}