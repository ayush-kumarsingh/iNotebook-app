const connecttomongodb = require('./db');
const cors = require('cors');
connecttomongodb();

const express = require('express');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.listen(port,()=>{
    console.log('connected to backened using express.js');
})
app.use('/api/auth',require('./routes/auth'));

app.use('/api/notes',require('./routes/notes'))