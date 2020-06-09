const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res)=>{
  db("accounts")
    .select("*")
    .then(accounts => res.status(200).json(accounts))
    .catch(err => {
      console.log(err)
      res.status(500).json(error.message)
    })
})

server.get('/api/accounts/:id', (req, res)=>{
  db("accounts")
    .select("*")
    .where({id: req.params.id})
    .first()
    .then(account => res.status(200).json(account))
    .catch(err => console.log(err))
})

server.post('/api/accounts', (req, res)=>{
  db("accounts")
    .insert(req.body, "id")
    .then(created => res.status(201).json(created))
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message)
    })
})

server.put('/api/accounts/:id', (req, res)=>{
  db("accounts")
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(`Account ${req.params.id} Updated Successfully`)
      } else {
        res.status(404).json(`No Account ID ${req.params.id} Found`)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message)
    })
})

server.delete('/api/accounts/:id', (req, res)=>{
  db("accounts")
    .where({id: req.params.id})
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(`Account ID ${req.params.id} Deleted`)
      } else {
        res.status(404).json(err.message)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err.message)
    })
})

module.exports = server;
