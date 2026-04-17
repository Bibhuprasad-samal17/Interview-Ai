const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require('cors');


const app = express();

// use middlewares here
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


/* require all Routes here */
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');


/* use Routes here */
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);



module.exports = app;