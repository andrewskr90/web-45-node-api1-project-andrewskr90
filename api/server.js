// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()
server.use(express.json())

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Users.insert(req.body)
        .then(resp => {
            res.status(201).json(resp)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })            
        })
    }
    })

server.get('/api/users', (req, res) => {
    Users.find()
        .then(userz => {
            res.status(200).json(userz)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    Users.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(202).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        Users.update(id, req.body)
            .then(update => {
                if(update == null){
                    res.status(404).json({ message: "The user with the specified ID does not exist" })
                } else {
                    res.status(200).json(update)
                }
            })
            .catch(err => {
                res.status(500).json({ message: "The user information could not be modified" })
            })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
