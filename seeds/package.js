
const mongoose = require('mongoose');
const User =  require('../models/user')
const Package = require('../models/package')


const dbUrl = 'mongodb://localhost:27017/ExpressBox';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const items = ['Laptop','Vestido','Libro','Celular','Zapatilla','Accesorios','Juguete','Audifonos','Reloj','Crema']
const origens = ['AliExpress','Amazon','Ebay','Shein','DhGate']

function trackingGen() {
    let r = Math.random().toString(36).substring(3);
    return(r.toUpperCase()+Math.floor(Math.random() * (1999 - 1000))+1000)
}


for(i=0; i<10; i++){
    const itemName = items[Math.floor(Math.random() * items.length)]
    const tiendaOrigen = origens[Math.floor(Math.random() *origens.length)]
    const weightPack = Math.floor(Math.random() * (7 - 1)+1)
    const price = weightPack * 2.50
    User.random(async function(err, document) {
        try {
            package = new Package({name: itemName,origen: tiendaOrigen,IB: document.IB,trackingN:trackingGen(),status:'Bodega Miami', owner: document, weight: weightPack,fleetPrice: price})
            await package.save()
            } catch (error) {
            console.log(error);
            }
        }); 
}


