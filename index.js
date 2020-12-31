require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var exphbs = require('express-handlebars');
var handlebars = require('./_helpers/handlebars.js')(exphbs);
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');

app.engine('hbs', handlebars.engine).set('view engine', 'hbs').use(express.static(__dirname + '/public'));
app.use(cors({ origin: "http://192.168.1.201:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(fileUpload({ createParentPath: true }));
app.use(morgan('dev'));

const db = require("./models");
// const Role = db.role;
// Drop tables and re-create default data
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     Role.create({ id: 1, name: "admin" });
//     Role.create({ id: 2, name: "client" });
// });
db.sequelize.sync();

// Routing
app.get('/', (req, res) => { res.render('home'); });

require('./routes/api.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/private.routes')(app);

// app.use(function(err, req, res, next) {
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500).render('404', { errorCode: res.statusCode, error: err});
// }); 

var server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});