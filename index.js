require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

var exphbs = require('express-handlebars');
var handlebars = require('./_helpers/handlebars.js')(exphbs);

// set up our express application
app.engine('hbs', handlebars.engine).set('view engine', 'hbs').use(express.static(__dirname + '/public'));
// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routing
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/api/users', require('./users/users.controller'));

app.use(errorHandler);

// 404 or error page
// app.use(function(err, req, res, next) {
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500).render('404', { errorCode: res.statusCode, error: err});
// }); 

var server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});