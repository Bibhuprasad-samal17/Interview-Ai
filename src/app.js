const express = require('express');
const cookieParser = require("cookie-parser")


const app = express();

// use middlewares here
app.use(express.json());
app.use(cookieParser())


/* require all Routes here */
const authRouter = require('./routes/auth.routes');



/* use Routes here */
app.use('/api/auth', authRouter);

 

module.exports = app;