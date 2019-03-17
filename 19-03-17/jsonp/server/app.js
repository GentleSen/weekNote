const express = require('express');
const app = express();

app.set('jsonp callback name', 'cb');
app.get('/index.js', (req,res) => {
    const { cb } = req.query;
    const data = {
        errno: 0,
        errsg: 'success',
        data: {
            name: 'SenSir',
            id: '123456',
        }
    };
    const content = `(${cb})(${JSON.stringify(data)})`;
    res.set('Content-Type', 'application/javascript');
    res.send(content);
});

app.listen(8080, ()=> {
    console.log(`server run at 8080`);
});
