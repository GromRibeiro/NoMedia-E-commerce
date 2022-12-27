const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
            bcrypt.hash(password, saltRounds , (err, hash) => {
                db.query("INSERT INTO users (name,email, password) VALUES (?, ?, ?)", [name,email, hash], (err) => {
                    if (err) {
                        res.send(err)
                    }
                    res.send({msg: "Sucessfully added"})
                })
            })
        }else{
            res.send({msg: 'Email already added'})
        }
    })
})

app.post("/auth/login", (req,res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?", [email] , (err, result) => {
        if (err) {
            res.send(err)
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, result) =>{
                if(result){
                    res.send({msg: "Entered Successfully"})
                }else{
                    res.send({msg: "Incorrect Password"})
                }
            })
        }else{
            res.send({msg: "Email  Not Found"})
        }
    })
})

app.listen(3001, () => {
    console.log('listening on')
})