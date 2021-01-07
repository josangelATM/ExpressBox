const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const { isLogged, isAdmin } = require('../middleware')
const passport = require('passport')

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local'),users.login)

router.route('/register')
    .get(users.renderRegister)
    .post(users.register)

router.get('/logout',isLogged,users.logut)


module.exports = router;