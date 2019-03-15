const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use('/static' ,express.static(path.resolve(__dirname, './web')));

app.post('/postAjax', upload.array(), function(req, res) {
    res.send(req.body);
});
app.get('/getAjax', upload.array(), function(req, res) {
    res.send(req.query);
});

app.listen('8888', function() {
    console.log('server are running at port 8888');
});