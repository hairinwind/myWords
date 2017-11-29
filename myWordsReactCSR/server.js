const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./auth');

var index = require('./routes/index');
var words = require('./routes/words');

var app = express();

//security
app.disable('x-powered-by');
var helmet = require('helmet');
app.use(helmet());

//passport
passport.init(app);

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set static Folder for angular 2
app.use(express.static(path.join(__dirname, 'client/public')));

//Body Parser Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
// app.use(bodyParser.text({type:"*/*", limit: '1mb'}));  

app.use('/', index);
// app.use('/addWords', ReactClient);
// app.get('/viewWords', ReactClient);
app.use('/api', words); //passport.authenticate,

var port = 12345;
app.listen(port, function(){
	console.log('Server started on port ' + port);
});