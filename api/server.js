// BUILD YOUR SERVER HERE

// import express from 'express' in ES6
const express = require('express') // commonjs
const USER = require('./users/model') 

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) // parse json from requests



// EXPOSING THE SERVER TO OTHER MODULES
// export default server 
module.exports = server // EXPORT YOUR SERVER instead of {}