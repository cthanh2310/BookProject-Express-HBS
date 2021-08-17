require('dotenv').config({path: './configs/.env'});
//connect DB 
const {connectDB} = require('./configs/db.js');
connectDB();

const path = require('path');
const express = require('express');
var methodOverride = require('method-override')
const app = express();
app.use(methodOverride('_method'))
// Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

console.log('port env: ' + process.env.app_port)
const route = require('./routes/index');
const handlebars = require('express-handlebars'); 
app.use(express.static(path.join(__dirname, 'public')));  //static file: use in template engine 
app.use(
    express.urlencoded({
        extended: true, // delete bug
        limit: '50mb',
    }),
);
app.use(express.json({limit: '50mb'}));
// XMLHTTP request, fetch, axios, ajax of jquery -->send database to server

var hbs = handlebars.create({});

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            multiplication: function(a, b) {
                return (a * b).toLocaleString('vi', {style : 'currency', currency : 'VND'});;
            },
            convertToVND: function(a){
                return a.toLocaleString('vi', {style : 'currency', currency : 'VND'});;
            },
            select: function(selected, options) {
                return options.fn(this).replace(
                    new RegExp(' value=\"' + selected + '\"'),
                    '$& selected="selected"');
            },
        }
    }),
    
);
app.set('view engine', 'hbs'); // Set view engine = handlebars
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port} `);
});
