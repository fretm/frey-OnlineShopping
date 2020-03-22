const Product = require("../model/product");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
exports.displayproduct = (req, res, next) => {
  Product.find().then(result => res.render("userpage", { prod: result }));
};

exports.addtocart = async (req, res, next) => {
  let id = req.params.id;
  let prod = await Product.findById(id);
  User.findById(req.session.user._id).then(result => {
    result.cart.item.push({ product: prod });
    result.save().then(res.redirect("/user"));
  });
};

exports.dispalycart = async (req, res, next) => {
  let prod = await User.findById(req.session.user._id);
  let pp = prod.cart.item;
  res.render("cart", { prod: pp });
};

exports.diplayregister = (req, res, next) => {
  res.render("register");
};

exports.registeruservalidation = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email })
    .then(result => {
      if (!result) {
        bcrypt.hash(password, 12).then(hasedpassword => {
          const newuser = new User({
            email: email,
            password: hasedpassword
          });
          newuser.save().then(result => {
            res.redirect('/userlogin/');
          });
        });
      } else {
        res.redirect("/user/register");
      }
    })
    .catch(err => {
      console.log(err);
    });
};
//display login page
exports.userlogin = (req, res, next) => {
  const loginerr = req.flash("loginErr");
  res.render("login", { loginerr: loginerr });
};

exports.checkifuser = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }).then(result => {
    if (!result) {
      req.flash("loginErr", "Invalid Username or Password!");
      const loginerr = req.flash("loginErr");
      res.render("login", { loginerr: loginerr });
    } else {
      bcrypt.compare(password, result.password).then(ismatch => {
        if (ismatch) {
          req.session.isAuthenticated = true;
          req.session.user = result;
          res.redirect("/user");
        } else {
          req.flash("loginErr", "Invalid Username or Password!");
          const loginerr = req.flash("loginErr");
          res.render("login", { loginerr: loginerr });
        }
      });
    }
  });
};

exports.purchasepage = async (req, res, next) => {
  let prod = await User.findById(req.session.user._id);

  res.render("payment", { products: prod.cart.item });
};

exports.deletfromcart = (req, res, next) => {
  User.findById(req.session.user._id).then(result => {
    result.cart.item = result.cart.item.filter(
      item => item.id != req.params.id
    );
    result.save().then(() => {
      res.redirect("/user/dispaycar/");
    });
  });
};

exports.logoutuser = (req, res, next) => {
  req.session.isAuthenticated = false;
  res.redirect("/user");
};
