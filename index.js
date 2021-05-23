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
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//put the sass just before server starts
app.use(sassMiddleware({
    src: './assets/scss',  //from where to take the css;
    dest: './assets/css',
    debug : true,//to display some error message
    outputStyle: 'extended',//single line?
    prefix: '/css' //in which folder to look in side assets
}))
app.use(express.urlencoded());
app.use(cookiePareser());

//for static files
app.use(express.static('./assets'));

//put this before routes
app.use(expressLayouts);
//extracts style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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

//use flash just afer session
app.use(flash());
app.use(customMware.setFlash);//using the middleware for flash

// use express router, should be used after initializing passport
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
        //console.log("Error", err);
        console.log(`Error in running the server: ${err}`);
    console.log(`Server  is  running on  port: ${port}`);

})