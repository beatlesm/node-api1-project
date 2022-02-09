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


// EXPOSING THE SERVER TO OTHER MODULES
// export default server 
module.exports = server // EXPORT YOUR SERVER instead of {}