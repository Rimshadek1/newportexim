const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./Config/connection')
const indexRouter = require("./Routes/router");
require("dotenv").config();
const PORT = process.env.port;
const origin = process.env.origin;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
// middleware
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: origin,
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use('/', indexRouter);


// connection
db.connect((err) => {
    if (err)
        console.log('errrorrrr' + err);
    else
        console.log("Database connected");
})

app.listen(PORT, () => {
    console.log(`Server start at Port No :${PORT}`)
})
