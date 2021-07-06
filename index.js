require('dotenv').config({path: './configs/.env'});
//connect DB 
const {connectDB} = require('./configs/db.js');
connectDB();
const path = require('path');
const express = require('express');
const app = express();

console.log('port env: ' + process.env.app_port)
const route = require('./routes/index');
const handlebars = require('express-handlebars');
app.use(express.static(path.join(__dirname, 'public')));  //static file: use in template engine 
app.use(
    express.urlencoded({
        extended: true, // delete bug
    }),
);
app.use(express.json());
// XMLHTTP request, fetch, axios, ajax of jquery -->send database to server
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs'); // Set view engine = handlebars
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port} `);
});
