require('dotenv').config;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');



const app = express();
const port = process.env.PORT;


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.1xi05kq.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const usersRouter = require('./routes/users');

app.use('/users',usersRouter);

app.listen(port,()=> {
    console.log(`Server is running on port: ${port}`);
});