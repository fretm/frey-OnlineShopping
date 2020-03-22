const express = require("express");
const router = express.Router();
const usercontroler = require("../controler/user");
const auth = require("../middleware/auth");

router.get(["/", "/user"], usercontroler.displayproduct);
router.post("/user/add-tocart/:id", auth.protect, usercontroler.addtocart);
router.get("/user/dispaycar/", auth.protect, usercontroler.dispalycart);
router.get("/user/dispayregister", usercontroler.diplayregister);
router.post("/user/register", usercontroler.registeruservalidation);
router.get("/userlogin/", usercontroler.userlogin);
router.post("/userlogin", usercontroler.checkifuser);
router.get("/user/purchase", auth.protect, usercontroler.purchasepage);
router.post("/delet/product/:id", auth.protect, usercontroler.deletfromcart);
router.get("/logout", usercontroler.logoutuser);

module.exports = router;
