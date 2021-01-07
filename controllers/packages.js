const Package = require('../models/package')
const User = require('../models/user')

module.exports.renderAdd = (req, res) => {
    res.render('admin/add',{title: 'Registrar Paquete | ExpressBox'})}

module.exports.addPackage = async (req, res, next) => {
    const ownerPack = await User.findOne({IB: req.body.IB})
    if(!ownerPack){
        req.flash('error','IB no existente.')
        return res.redirect('/package/add')
    }
    const package = new Package({ name: req.body.name, origen: req.body.origen, IB: req.body.IB, trackingN: req.body.tracking, status: req.body.status, owner: ownerPack, weight: req.body.weight, fleetPrice: (req.body.weight*2.50)})
    try {
    await package.save()
    } catch (error) {
        console.log(error);
        req.flash('error',`${error}`)
        return res.redirect('/package/add')
    }
    req.flash('success','Paquete registrado con éxito.')
    res.redirect('/package/add')
    
}

module.exports.renderUpdate = async (req, res) => {
    const packages = await Package.find().sort({registDate: -1}).limit(5)
    res.render('admin/update', {title: 'Actualizar paquete | ExpressBox',packages: packages})
}


module.exports.showPackagesUser = async (req,res) => {
    const packages = await Package.find({IB: req.user.IB})
    res.render('customer/packages',{title: 'Mis paquetes | ExpressBox', packages: packages })
}

module.exports.showPackagesAdmin = async (req, res) => {
    if(req.body.IB){
        const packages = await Package.find({IB: req.body.IB})
        console.log(packages);
        return res.render('admin/update', {title: 'Actualizar paquete | ExpressBox',packages: packages})
    }
    if(req.body.tracking){
        const packages = await Package.find({trackingN: req.body.tracking})
        return res.render('admin/update', {title: 'Actualizar paquete | ExpressBox',packages: packages})
    }
}

module.exports.renderPackage = async (req, res) => {
    const package = await Package.findById(req.params.id)
    res.render('admin/pack_update', {title: 'Actualizar paquete | ExpressBox',package: package})
}

module.exports.updatePackage =async (req, res) => {
    const idPackage = req.params.id
    await Package.findByIdAndUpdate(idPackage, { status: req.body.status})
    res.redirect(`package/update/${idPackage}`)
}



