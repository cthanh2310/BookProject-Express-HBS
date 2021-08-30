const jwt = require('jsonwebtoken');
const users = require('../models/user');
const reviews = require('../models/review');
const mongoose = require('mongoose');
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
            // console.log(data);
            if (data.token) {
                const token = data.token;
                var { userId } = await jwt.verify(token, process.env.SECRET_KEY)
                if (userId) {
                    socket.join(data.link)
                    let review = await reviews.findOne({ _id: data.reviewID })
                        .then((review => {
                            return review.toObject()
                        }))
                        .catch(err => {
                            return err;
                        })
                    var exist = false;
                    if (review.likes.length > 0) {
                        review.likes.forEach(async (user) => {
                            if (user == userId) {
                                exist = true;

                                // console.log('new like' + newLikew)
                                review.likes.splice(review.likes.indexOf(user), 1);
                                await reviews.updateOne({ _id: data.reviewID },
                                    {
                                        likes: review.likes,
                                    }
                                )
                                let length = review.likes.length;
                                io.sockets.in(data.link).emit('like', { length, reviewID: data.reviewID, token})  // send to all people in room
                                socket.emit('onlyMeSeeStatusLike', {reviewID: data.reviewID,token, status: 'unlike'}) 
                            }
                        })
                    }
                    if (!exist) {
                        review.likes.push(userId);
                        await reviews.updateOne({ _id: data.reviewID }, { likes: review.likes })
                        let length = review.likes.length;
                        io.sockets.in(data.link).emit('like', { length, reviewID: data.reviewID, token}) // send to all people in room
                        socket.emit('onlyMeSeeStatusLike', {reviewID: data.reviewID,token, status: 'like'}) 
                    }
                }
                const error = new Error();
                error.status = 404;
                error.message = 'User no found!'
                return error;
            }
            return socket.emit('like')
        })
    })
}