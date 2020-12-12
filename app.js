const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const engine = require('ejs-mate')
const bodyParser = require('body-parser')
const User = require('./models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const session = require('express-session')
const IBgenerator = require('./utils/randomIB')
const Package = require('./models/package')

 
app.engine('ejs', engine);
 
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true } remove this line for HTTP connection
  }))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

//Middleware
const isLogged = function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/',(req,res) => {
    res.render('home', {currentUser: res.locals.currentUser})
})

app.get('/login', (req,res) => {
    res.render('login', {currentUser: res.locals.currentUser})
})

app.post('/login', passport.authenticate('local'), async (req,res) => {
    res.locals.currentUser = req.user;
    console.log(req.user.type);
    res.render('home')
})

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        req.logout()
        res.redirect('/')
      });
})

app.get('/register', (req,res) => {
    res.render('register', {currentUser: res.locals.currentUser})
})
app.post('/register', async (req,res) => {
    const user = new User({name: req.body.name, lastname: req.body.lastname, email: req.body.mail, username : req.body.username, IB : IBgenerator(), type : 'admin'}); 
    const registeredUser = await User.register(user,req.body.password)
    req.login(registeredUser, err => {
        if (err) return next(err);
        res.redirect('/');
    })
})

app.get('/add', (req, res) => {
    res.render('admin/add')
})

app.post('/add', async (req, res) => {
    const ownerPack = await User.findOne({IB: req.body.IB})
    const package = new Package({ name: req.body.name, origen: req.body.origen, IB: req.body.IB, trackingN: req.body.tracking, status: req.body.status, owner: ownerPack })
    await package.save()
    res.redirect('/add')
    
})

app.get('/packages', async (req,res) => {
    const packages = await Package.find({IB: req.user.IB})
    res.render('customer/packages',{ packages: packages })
})

app.listen(port, () => {
    console.log('Up and Running');
})