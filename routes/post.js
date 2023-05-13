const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth")


router.get('/', ensureAuthenticated, (req, res) => {
  res.render('create-post', { title: "Create Post" })
})


module.exports = router