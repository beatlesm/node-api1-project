// BUILD YOUR SERVER HERE

// import express from 'express' in ES6
const express = require('express') // commonjs
const USER = require('./users/model') 

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // parse json from requests

// ENDPOINTS

// [GET]  / (Hello World endpoint)
// api is made of endpoints such as
// http://user.com:9000/hello_world
server.get('/hello_world', (req, res) => {
    res.status(201).json('hello world!')
})

// [POST] /api/users (C of CRUD, create new user from JSON payload)
server.post('/api/users', async (req, res) => {
    try {
      const { name, bio } = req.body
      console.log(name, bio)
      const newUser = await USER.insert({ name, bio })
      console.log(newUser)

      if (!name || !bio ) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
      }  else {
        res.status(201).json(newUser) // :(
      }
      
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// [GET] /api/users (R of CRUD, fetch all userss)
server.get('/api/users', async (req, res) => {
    try {
      const users = await USER.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

// [GET] /api/users/:id (R of CRUD, fetch user by :id)
server.get('/api/users/:id', async (req, res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.params)
    try {
        const { id } = req.params
        const user = await USER.findById(id)
        if (!user) {
          res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
          res.status(200).json(user)
        }
      } catch (err) {
        // if promise were to reject
        // or if another thing crashed inside the try
        // then we fall through here
        res.status(500).json({ message: err.message })
      }    
  })

  

// EXPOSING THE SERVER TO OTHER MODULES
// export default server 
module.exports = server // EXPORT YOUR SERVER instead of {}