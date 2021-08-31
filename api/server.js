// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
        .then(user => {
            if(user) {
                res.status(201).json(user)
            } else {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: "Please provide name and bio for the user" })
        })
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(userz => {
            res.status(200).json(userz)
        })
        .catch(err => {
            console.log(err.message)
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
