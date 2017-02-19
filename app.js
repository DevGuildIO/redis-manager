const express = require('express');
let app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const router = require('./api/index');

server.listen(process.env.PORT || 9999, function(){
    console.log("Server connected. Listening on port: 9999");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/front'));

app.use(router);