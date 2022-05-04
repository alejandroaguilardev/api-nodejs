const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

const { dbConnection } = require("./database/config");

//DB
dbConnection();

app.use(cors());

//Public
app.use( express.static('public') );

//parse Body Json
app.use(express.json());


//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo'+ process.env.PORT);
});
    