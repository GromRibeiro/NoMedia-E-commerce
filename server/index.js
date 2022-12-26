const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'e-commerce'
})
app.use(cors())
app.use(express.json())

app.post("/auth/register", (req,res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err) {
            res.send(err)
        }
        if(result.length === 0){
            db.query("INSERT INTO users (name,email, password) VALUES (?, ?, ?)", [name,email, password], (err) => {
                if (err) {
                    res.send(err)
                }
                res.send({msg: "Sucessfully added"})
            })
        }else{
            res.send({msg: 'Email already added'})
        }
    })
})

app.listen(3001, () => {
    console.log('listening on')
})