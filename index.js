console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV != "production") {  // neu dev thi import cai dotenv de dung env tu .env ; neu da len production thi dung env trong config vars 
    require('dotenv').config({ path: './configs/.env' });
    console.log('ok in local env');
} else {
    console.log('ok in production env');

}

//connect DB 
const { connectDB } = require('./configs/db.js');
connectDB();
const passport = require('passport');


const path = require('path');
const express = require('express');
var methodOverride = require('method-override') //override method post at formAction
const app = express();
const http = require('http')

const server = http.createServer(app);
var io = require('socket.io')(server);
require('./utils/socketIO')(io);
// io.on('connection', (socket) => {
//     console.log('user is accessing: ' + socket.id);
//     socket.on('disconnect', () =>{
//         console.log('socket:' + socket.id + ' disconnected!!!!!!!')
//     })
//     socket.on('sendData', function(data) {
//         console.log(data)
//         io.sockets.emit('sendData', 'okok')
//     })
// })


app.use(methodOverride('_method'))
// Cookie
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./utils/passportGoogle');

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

//google oauth2
app.use(passport.initialize());
app.use(passport.session());

// console.log('port env: ' + process.env.app_port)  //? gi day in ra de test xem da an cai .env chua. hoi dau t moi tao project
const route = require('./routes/index');
const handlebars = require('express-handlebars');
app.use(express.static(path.join(__dirname, 'public')));  //static file: use in template engine 
app.use(
    express.urlencoded({
        extended: true, // delete bug
        limit: '50mb',
    }),
);
app.use(express.json({ limit: '50mb' }));
// XMLHTTP request, fetch, axios, ajax of jquery -->send database to server

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            multiplication: function (a, b) {
                return (a * b).toLocaleString('vi', { style: 'currency', currency: 'VND' });;
            },
            convertToVND: function (a) {
                return a.toLocaleString('vi', { style: 'currency', currency: 'VND' });;
            },
            select: function (selected, options) {    // check status of product. render status correct !
                return options.fn(this).replace(
                    new RegExp(' value=\"' + selected + '\"'),
                    '$& selected="selected"');
            },
            setChecked: function (value, currentValue) {
                if (value == currentValue) {
                    return "checked";
                } else {
                    return "";
                }
            },
            setDate: function (a) {
                return a.getFullYear().toString() + '-' + (a.getMonth() + 1).toString() + '-' + a.getDate().toString()
            },
            or: function (a, b) {
                if (a != null) {
                    return a;
                } else return b;
            },
            orImage: function (a) {
                if (a != null) {
                    return a;
                } else return '/images/user2.png';
            }
        }
    }),

);
app.set('view engine', 'hbs'); // Set view engine = handlebars
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
const port = parseInt(process.env.PORT);
console.log(port);
server.listen(port, () => {
    console.log(`App listening at http://localhost:${port} `);
});
