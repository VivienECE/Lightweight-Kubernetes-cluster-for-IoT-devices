const express = require('express')
const mesureController = require('../controllers/mesure')

const mesureRouter = express.Router()

mesureRouter
  .post('/', (req, resp) => {
    mesureController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:datetime', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    mesureController.get(req.params.datetime, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
   .get('/', (req, resp, next) => {
    mesureController.getAll((err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
    .put('/:datetime', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    mesureController.put(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
   .delete('/:datetime', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    mesureController.delete(req.params.datetime, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
  
module.exports = mesureRouter
