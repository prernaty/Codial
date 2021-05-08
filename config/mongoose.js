const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users_list');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'Error connecting'));
db.once('open',function(){
    console.log('Sucessfully connected');
});