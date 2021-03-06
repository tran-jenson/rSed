var express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  session = require("express-session"),
  methodOverride = require("method-override"),
  mongoStore = require("connect-mongo")(session);

var preferences = require("./routes/preferences"),
  profile = require("./routes/profile"),
  editProfile = require("./routes/editProfile"),
  User = require("./models/user"),
  restaurantPop = require("./routes/restaurantPop"),
  restaurantprofile = require("./routes/restaurantprofile"),
  indexAuth = require("./routes/indexAuth"),
  shoppingcart = require("./routes/shoppingcart"),
  orderhistory = require("./routes/orderhistory"),
  restaurantcategory = require("./routes/restaurantcategory"),
  itemconfirm = require("./routes/itemconfirm"),
  shoppingcart = require("./routes/shoppingcart"),
  receipt = require("./routes/receipt"),
  american = require("./routes/restauranttypes/american"),
  asian = require("./routes/restauranttypes/asian"),
  indian = require("./routes/restauranttypes/indian"),
  italian = require("./routes/restauranttypes/italian"),
  mediterranean = require("./routes/restauranttypes/mediterranean"),
  mexican = require("./routes/restauranttypes/mexican"),
  checkoutConfirmation = require("./routes/checkoutConfirmation");
addshoppingcart = require("./routes/addshoppingcart");
editpreferences = require("./routes/editpreferences");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
//Connect to mongodb
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bigodobonhonkeros-jdryx.mongodb.net/OmNom_Foods?authSource=admin&replicaSet=xyz`;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to database")
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connection Successful!");
});

app.use(
  session({
    secret: "butthole",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/public", express.static("./public"));

app.use("/preferences", preferences);
app.use("/profile", profile);
app.use("/editProfile", editProfile);
app.use("/restaurantPop", restaurantPop);
app.use("/restaurantcategory", restaurantcategory);
app.use("/restaurantprofile", restaurantprofile);
app.use("/shoppingcart", shoppingcart);
app.use("/orderhistory", orderhistory);
app.use("/", indexAuth);
app.use("/shoppingcart", shoppingcart);
app.use("/itemconfirm", itemconfirm);
app.use("/asian", asian);
app.use("/american", american);
app.use("/indian", indian);
app.use("/italian", italian);
app.use("/mediterranean", mediterranean);
app.use("/mexican", mexican);
app.use("/receipt", receipt);
app.use("/addshoppingcart", addshoppingcart);
app.use("/editpreferences", editpreferences);
app.use("/checkoutConfirmation", checkoutConfirmation);

//added this for testing purposes
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});
//testingggg

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}
console.log('butthole');

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
