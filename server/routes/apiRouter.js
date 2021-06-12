const router = require('express').Router()
const locationRouter = require('./locations')

router.use('/location', locationRouter)

module.exports = router