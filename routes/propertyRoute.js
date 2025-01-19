var express=require("express")
const { creatProperty, viewProperty, Allproperty,  } = require("../controller/propertyController")
var router=express.Router()

router.post("/post",creatProperty)
router.get("/viewallproperties",Allproperty)
router.get("/:propertyId",viewProperty)


module.exports=router