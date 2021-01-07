const Package = require('../models/package')
const User = require('../models/user')

module.exports.renderLogin = (req,res) =>{
    res.render('login',{title: 'Login | ExpressBox',currentUser: res.locals.currentUser})
}


module.exports.login = async (req,res) =>{
    res.locals.currentUser = req.user;
    const returnTo = req.session.returnTo || 'package/packages'
    res.redirect(returnTo)
}

module.exports.logut = (req, res) => {
    req.session.destroy(function (err) {
        req.logout()
        res.redirect('/')
      });
}

module.exports.renderRegister = (req,res) => {
    res.render('register', {title: 'Registro | ExpressBox', currentUser: res.locals.currentUser})
}

module.exports.register = async (req,res) => {
    const user = new User({name: req.body.name, lastname: req.body.lastname, email: req.body.mail, username : req.body.username, IB : IBgenerator(), type : 'admin'}); 
    const registeredUser = await User.register(user,req.body.password)
    req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/');
    })
}

module.exports.showLastUsers = async (req, res) =>{
    const customers = await User.find().sort({registDate: -1}).limit(5)
    res.render('admin/cust_search', {title: 'Buscar clientes | ExpressBox',customers: customers})
}

module.exports.searchCustomers = async (req,res)=> {
    let customers = []
     switch(req.body.type){
        case "IB":
            customers = await User.find({IB:req.body.input})
            return  res.render('admin/cust_search', {title: 'Buscar clientes | ExpressBox',customers: customers})
        break;
        case "name":
            customers = await User.find({name:{$regex: req.body.input}})
            return res.render('admin/cust_search', {title: 'Buscar clientes | ExpressBox',customers: customers})
        break;
        case "username":
            customers = await User.find({username:{$regex: req.body.input}})
            return res.render('admin/cust_search', {title: 'Buscar clientes | ExpressBox',customers: customers})
        break;

    }
}

module.exports.showUser = async (req, res) =>{
    const id = req.params.id
    const customer = await User.findById(id)
    const packages = await Package.find({IB: customer.IB})

    res.render('admin/edit_customer',{title:`Cliente ${customer.username}`, customer, packages})
}

