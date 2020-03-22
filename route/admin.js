const express = require('express')
const router = express.Router()
const usercontroler =  require('../controler/admin')



router.get('/admin',usercontroler.displayproduct)
router.get('/admin/add-product',usercontroler.displayadminform)
router.post('/admin/add-product',usercontroler.newproduct)
router.get('/admin/eddit-product/:id',usercontroler.editproduct)
router.post('/admin/eddit-product',usercontroler.updateproduct)
router.post('/admin/delet/:id',usercontroler.deletproduct)
router.post('/admin/viewdetail/:id',usercontroler.viewdetail)


module.exports=router