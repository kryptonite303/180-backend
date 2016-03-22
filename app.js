var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var passport = require('passport');
var router = express.Router();
var users = require('./routes/users');
var app = express();
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');

var allowedHosts = [
    'http://localhost:3000',
    'http://127.0.0.1:9000',
    'http://simpli.padsquad.com',
    'http://staging.simpli.padsquad.com',
    'http://api.padsquad.com',
    'http://staging.api.padsquad.com',
    'http://ssp.simpli.padsquad.com'
];

var publicPaths = [
    '/login',
    '/logout',
    '/users/set_password/',
    '/users/forgot_password/',
    '/users/validate_token/',
    '/users',
    '/simpliConfiguration/'
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.all('*', function(req, res, next) {
    var hostIndex = allowedHosts.indexOf(req.get('origin'));

    res.header('Access-Control-Allow-Origin', allowedHosts[hostIndex]);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Accept-Encoding');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods','GET, POST, DELETE, OPTIONS');

    req.user = {
    	name: "john"
    }

    if( req.user || publicPaths.indexOf(req.path) != -1){
        next();
    }else if(req.method === "OPTIONS"){
        return res.send(200);
    }else{
         var err = new Error('Unauthorized Access');
         err.status = 401;
         next(err);
    }
});

app.use('/users/', users);

app.listen(3000, function() {
	console.log('listening on 3000');
})