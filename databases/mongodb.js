const mongoose = require('mongoose');
require('dotenv').config();
const username = process.env.DB_USERNAME;
const mdp = process.env.DB_PASSWORD
const uri = 'mongodb+srv://'+username+':'+mdp+'@cluster0.pukdm.mongodb.net/?retryWrites=true&w=majority';

exports.connect = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: cannot connect to my DB')); 
    db.once('open', () => {
    console.log('connected to the DB ');
    })

    return mongoose;
}