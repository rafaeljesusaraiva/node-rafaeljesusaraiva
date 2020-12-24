var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var handlebars  = require('./helpers/handlebars.js')(exphbs);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash    = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');

var app = express();
var server = app.listen(3000, () => { console.log(`Express running → PORT ${server.address().port}`); });

require('./config/passport')(passport);
// set up our express application
app.engine('hbs', handlebars.engine)
   .set('view engine', 'hbs')
   .use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.get('/', (req, res) => {
    res.render('home');
});

require('./routes/private')(app, passport);

// 404 or error page
app.use(function(err, req, res, next) {
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).render('404', { errorCode: res.statusCode, error: err});
}); 