const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection');

app.use(express.json())
app.use(cors())


app.listen(3000, () => {
    console.log('Listening on port 3000');
});