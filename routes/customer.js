const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const { isLogged, isAdmin } = require('../middleware')


router.route('/')
    .get(isLogged, isAdmin, users.showLastUsers)
    .post(isLogged, isAdmin, users.searchCustomers)

router.get('/:id',isLogged, isAdmin, users.showUser)

module.exports= router;