const Quotation = require('../models/quotation')
const User = require('../models/user')

module.exports.showQuotationsUser = async (req,res)=> {
    const quotations = await Quotation.find({owner: res.locals.currentUser.id})
    res.render('customer/cust_quotation',{title: 'Cotizaciones | ExpressBox', quotations:quotations})
}

module.exports.uploadQuotation = async (req,res)=> {
    const messageQuot = req.body.message;
    const idOwner = res.locals.currentUser.id
    const productsLinks = req.body.links.split(";")
    const email = req.body.emailTo || res.locals.currentUser.email
    
    const quotation = new Quotation({owner: idOwner, message: messageQuot, links: productsLinks, emailTo: email})
    await quotation.save()
    const quotations = await Quotation.find({owner: res.locals.currentUser.id})
    req.flash('success','Cotización enviada.')
    res.redirect('/quotation')
}

module.exports.showQuotationsPending = async (req,res)=>{
    const pendingQuotations = await Quotation.find({status:"pendiente"})
    res.render('admin/admin_quotations',{title: 'Ver Cotizaciones | ExpressBox', quotations:pendingQuotations})
}

module.exports.showQuotationsSearch = async (req,res)=>{
    let quotations = []
    switch(req.body.type){
        case "IB":
            console.log(req.body.input);
            const customer = await User.findOne({IB:req.body.input})
            quotations = await Quotation.find({owner: customer._id})
            return res.render('admin/admin_quotations', {title:'Cotización | ExpressBox', quotations})
        break;
        // case "ID":
        //     console.log(req.body.input);
        //     quotations = await Quotation.findOne({_id: req.body.input})
        //     console.log(quotations);
        //     return res.render('admin/admin_quotations', {quotations})
        // break;
    }
}


module.exports.showQuotation = async (req,res)=>{
    const quotation = await Quotation.findById(req.params.id).populate('owner')
    res.render('admin/quotation', {title: 'Ver Cotizaciones | ExpressBox', quotation})
}

module.exports.responseQuotation =  async (req,res)=>{
    const id = req.params.id
    await Quotation.findByIdAndUpdate(id,{status:'respondida'})
    req.flash('success','Cotización actualizada con éxito.')
    res.redirect(`/quotation/admin/${id}`)
}




