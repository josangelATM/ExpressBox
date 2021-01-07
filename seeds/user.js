
rawData = require('./raw.json')
const IBgenerator = require('../utils/randomIB')
const User = require('../models/user')
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/ExpressBox';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


for(data of rawData){
    data.username = data.name.split(" ")[0]+Math.floor(Math.random() * 10);
    data.IB= IBgenerator()
    let user = new User({name: data.name, email: data.email, username: data.username, IB: data.IB, type: data.type})
    User.register(user,'12345').then((result) => {
        console.log('Registered');
    }).catch((err) => {
        console.log(err);
    });
}


