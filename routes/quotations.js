const express = require('express')
const router = express.Router()
const quotations = require('../controllers/quotations')
const { isLogged, isAdmin } = require('../middleware')

router.route('/')
    .get(isLogged, quotations.showQuotationsUser)
    .post(isLogged, quotations.uploadQuotation)
    
router.route('/admin')
    .get(isLogged, isAdmin, quotations.showQuotationsPending)
    .post(isLogged,isAdmin, quotations.showQuotationsSearch)

router.route('/admin/:id')
    .get(isLogged,isAdmin, quotations.showQuotation)
    .patch(isLogged,isAdmin, quotations.responseQuotation)




module.exports = router;