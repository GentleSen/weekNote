const express = require('express');
const app = express();



app.use(express.static(__dirname + '/web', {
    etag: true,
    lastModified: true,
    maxAge: '10000',
}));

app.listen(3000,()=> {
    console.log(`server running at port 3000`);
})