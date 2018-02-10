const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

var app = express();

app.use(session({ secret: "thisisverysecretfoo"}));
app.use(bodyParser.json({extended:true}));

app.use(express.static(path.join(__dirname, 'public', 'dist')));

require('./server/config/mongoose');

let routes_setter = require('./server/config/routes');
routes_setter(app);

app.listen(8000, ()=>{
	console.log("listening on port 8000")
});
