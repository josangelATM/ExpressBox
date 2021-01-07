const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const engine = require('ejs-mate')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Package = require('./models/package')
const Quotation = require('./models/quotation')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const session = require('express-session')
const IBgenerator = require('./utils/randomIB')
const userRoutes = require('./routes/users')
const quotationRoutes = require('./routes/quotations')
const packageRoutes = require('./routes/packages')
const customerRoutes = require('./routes/customer')
const methodOverride  = require('method-override')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
 
app.engine('ejs', engine);
 
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ExpressBox';

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

//Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }))

app.use(flash())
const sessionFlash = function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();

}
app.use(sessionFlash)


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use('/', userRoutes)
app.use('/customer', customerRoutes)
app.use('/quotation',quotationRoutes)
app.use('/package', packageRoutes)



app.get('/',(req,res) => {
    res.render('home', {title: 'ExpressBox | De USA a Panamá', currentUser: res.locals.currentUser})
})


app.get('/FAQ', (req,res)=>{
    res.render('customer/faq',{title: 'Preguntas frecuentes | ExpressBox'})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Up and Running');
})