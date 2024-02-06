const path = require('path');

var express     = require("express")
var app         = express()
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var session    = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf');
const multer = require('multer');

var errorController = require("./controllers/404");
const passport = require("passport");

const publicRoute = require('./routes/public');
const adminRoute = require('./routes/admin');

const store = new MongoDBStore({
    uri: "mongodb://localhost/Ridez",
    collection: 'sessions'
})

const csrfProtection = csrf();


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + "/public"))

// Multer Config

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public');
    },
    filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `images/product/${file.fieldname}-${Date.now()}.${ext}`)
}
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Not an image'), false);
    }
  };

  const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
})

app.use(upload.single('image'))

// seedDB()

mongoose.connect("mongodb://localhost/Charles").then(()=> console.log("DB connection successfull")).catch((err)=>{console.log(err)});




app.use(session({
    secret: "Ridez the way",
    resave: false,
    saveUninitialized: false,
    store: store,
}))

app.use(csrfProtection);



app.use(passport.initialize());
app.use(passport.session());

app.use(publicRoute)

app.get("/", (req, res)=>{
    res.render("index")
})




app.use(errorController.get404Page)

// app.use((error, req, res, next) => {
//     res.status(500).render("500", { currentUser: req.user, PageTitle: "An Error occurred", Path: "/500",  csrfToken: req.csrfToken() })
// })

app.listen(8000, ()=>{
    console.log("construction website...")
})
    