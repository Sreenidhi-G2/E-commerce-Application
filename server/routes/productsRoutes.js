const router=require('express').Router();
const productctrl=require("../controllers.js/Productctrl")

router.route("/products")
.get(productctrl.getproduct)
.post(productctrl.createproduct)


router.route('/products/:id')
.delete(productctrl.deleteproduct)
.put(productctrl.updateproduct)


module.exports=router;