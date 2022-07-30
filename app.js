if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dotenv = require("dotenv"); // Define the dotenv package
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const homeRouter = require('./routers/homeRouter');
const port  = process.env.port || 9180;

const app  = express();

mongoose.connect('mongodb://localhost:27017/studentsdata',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',ejsMate);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', homeRouter);




  app.listen(port, () =>{
    console.log(`using port ${port}`);
});