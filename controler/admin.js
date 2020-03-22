const Product = require('../model/product')

exports.displayproduct=(req,res,next)=>{
      
    Product.find().then(result=>{
        res.render("admin" ,{'prod':result})

    })
     
}

exports.displayadminform=(req,res,next)=>{
    res.render('addproduct')
} 
exports.newproduct=(req,res,next)=>{
   const prod = new Product({
       title:req.body.title,
       image:req.body.image,
       price:req.body.price,
       Description:req.body.Description,

   })
   prod.save().then(result=>{
       console.log(prod)
       res.redirect('/admin')
   }).catch(err=>console.log(err))
}

exports.editproduct=(req,res,next)=>{
    id= req.params.id
    Product.findById(id).then(result =>{
        res.render('editform',{'prod':result})
    })}


exports.updateproduct=(req,res,next)=>{
   id =  req.body.id
   console.log(id)
  Product.findByIdAndUpdate(id,{
      title: req.body.title,
      image:req.body.image,
      price:req.body.price,
      Description:req.body.Description
  }).then(
      result => res.redirect("/admin")
  )
}

exports.deletproduct=(req,res,next)=>{
   id = req.params.id
   console.log(id)
   Product.findByIdAndDelete(id).then(
       result =>{
           res.redirect('/admin')
       }
   )

}

exports.viewdetail=(req,res,next)=>{
    id= req.params.id
    console.log(id)
    res.send("detail page ")
}