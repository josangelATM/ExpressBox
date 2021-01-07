const express = require('express');
const router = express.Router()
const packages = require('../controllers/packages')
const { isLogged, isAdmin } = require('../middleware')

router.route('/add')
    .get(isLogged, isAdmin, packages.renderAdd)
    .post(isLogged, isAdmin, packages.addPackage)

router.route('/update')
    .get(isLogged, isAdmin, packages.renderUpdate)
    .post(isLogged, isAdmin, packages.showPackagesAdmin)

router.route('/update/:id')
    .get(isLogged,isAdmin, packages.renderPackage)
    .patch(isLogged,isAdmin, packages.updatePackage)

router.get('/packages', isLogged, packages.showPackagesUser)

module.exports = router;