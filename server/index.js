const express = require('express');
const mysql = require('mysql');
const app = express();


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'e-commerce'
})

app.listen(3001, () => {
    console.log('listening on')
})