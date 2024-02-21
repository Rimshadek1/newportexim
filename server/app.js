const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./Config/connection')
const indexRouter = require("./Routes/router");
require("dotenv").config();
const PORT = process.env.port;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middleware
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors({
//     origin: ['https://rimshad.tech'],
//     methods: ['GET', 'POST', 'DELETE'],
//     credentials: true
// }));
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options("", cors(corsOptions))
// app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.send('working')
})
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
