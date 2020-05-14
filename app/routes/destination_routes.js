
const express = require('express')

const passport = require('passport')
const Destination = require('../models/destination')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
// this is middleware that will remove blank fields from `req.body`, e.g.
// { destination: { title: '', text: 'foo' } } -> { destination: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// GET /destinations
router.get('/destinations', requireToken, (req, res, next) => {
  const currentUser = req.user.id

  Destination.find({ owner : currentUser })
    .then(destinations => {
      return destinations.map(destination => destination.toObject())
    })
    .then(destinations => res.status(200).json({ userDestinations: destinations }))
    .catch(next)
})

// GET /destinations/:id
router.get('/destinations/:id', requireToken, (req, res, next) => {
  const destinationId = req.params.id

  Destination.findById(destinationId)
    .then(handle404)
    // if `findById` is succesful, respond with 200
    .then(destination => res.status(200).json({ destination: destination.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// POST /destinations
router.post('/destinations', requireToken, (req, res, next) => {
  // set owner of new destination to be current user
  const newDestination = req.body.destination
  newDestination.owner = req.user.id

  Destination.create(newDestination)
    .then(destination => {
      res.status(201).json({ destination: destination.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// PATCH /destinations/:id
router.patch('/destinations/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.destination.owner
  const destinationId = req.params.id
  const destinationChanges = req.body.destination

  Destination.findById(destinationId)
    .then(handle404)
    .then(destination => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, destination)
      return destination.updateOne(destinationChanges, {runValidators: true})
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))

    // if an error occurs, pass it to the handler
    .catch(next)
})

// DELETE /destinations/:id
router.delete('/destinations/:id', requireToken, (req, res, next) => {
  const destinationId = req.params.id

  Destination.findById(destinationId)
    .then(handle404)
    .then(destination => {
      // throw an error if current user doesn't own `destination`
      requireOwnership(req, destination)
      // delete the destination ONLY IF the above didn't throw
      destination.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
