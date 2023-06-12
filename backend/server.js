const express = require('express');
const { getItems } = require('./controllers/itemController');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

app.get('/api/items', (req, res) => {
    const { s_key } = req.query;
    getItems(req, res, s_key);
})

app.listen(4000,()=>{
    console.log("listening to port 4000");
})