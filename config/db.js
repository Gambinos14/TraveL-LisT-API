'use strict'

// creating a base name for the mongodb
const mongooseBaseName = 'project-2-api'

const localDb = `mongodb://localhost/${mongooseBaseName}`

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb
