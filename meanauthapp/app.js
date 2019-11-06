const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database '+config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('Error '+err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware 
app.use(cors() );

//set static folder
//set fron end folder
app.use(express.static(path.join( __dirname , 'public')));

//body-parser middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.get('/', (req,res) => {
	res.send('Invalid Endpoint');
});

app.listen(port, () => {
	console.log('Server started on the port '+port);
});