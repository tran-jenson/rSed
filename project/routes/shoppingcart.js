const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', async function(req, res) {

    // menuItems.forEach(menuItem => {
    //     MenuItem.findById(menuItem).lean().populate('restaurant').exec(function(err, foundMItem ) {
    //         if(err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log(counter);
    //             counter++;
    //             var temp = JSON.stringify(foundMItem)
    //             menuItemStr = menuItemStr.concat(temp);
    //             console.log(menuItemStr);
    //         }
    //     });
    // });
    res.render('shoppingcart', req.session.cart.generateArray()); 
});

router.get('/additem/:itemid', isLoggedIn, async(req, res) => {
    var userId = req.params.userid;
    var menuItemId = req.params.itemid;
    MenuItem.findById(menuItemId)
    .then(foundItem => {
        ShoppingCart.findById(req.user.shoppingcart)
        .then(foundCart => {
            foundCart.push(menuItemId);
            foundCart.save();
        })
        .catch(err => res.redirect('/'));
    })
    .catch(err => res.redirect('/'));
    res.redirect('/');
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;