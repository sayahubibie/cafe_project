const express = require("express")
const controller = require('../controller/cafe_controller')

const router = express.Router()

//
/*router.param('id', (req,res,next,val)=>{
    console.log(`cafe id is ${val}`)
    next()
})
*/
//Actual Router

router.route("/").get(controller.get_all_items).post(controller.add_new_item)
router.route("/:id").get(controller.get_cafe_item).patch(controller.update_item).delete(controller.detele_items)
//router.route("/add").post(controller.add_new_item)

module.exports = router
