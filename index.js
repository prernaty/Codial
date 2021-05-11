const express = require('express');
const cookiePareser = require('cookie-parser');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const app = express();
const port = 8000;
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); //to store session cookie

const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(cookiePareser());
app.use(express.static('./assets'));


//app.use(expressLayouts);
//app.set('layout extractStyles', true);
//app.set('layout extractScripts', true);


//setting view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware for cookies put after the views
//mongo store is used to store the session cookie in the DB
app.use(session({
    name:'Codial', //name of cookie
    secret: 'blashsomething', //encryption key
    saveUninitialized:false, // not logged in ueser, do you want to save extra info?
    resave:false , //some info is there in cookie for user, do you want to rewrite it?
    cookie:{
        maxAge :(1000*60*100) //calculated in miliseconds
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove: 'disabled'
        }, function(err){ //incase connection is not establised
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use express router, should be used after initializing passport
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
        //console.log("Error", err);
        console.log(`Error in running the server: ${err}`);
    console.log(`Server  is  running on  port: ${port}`);

})