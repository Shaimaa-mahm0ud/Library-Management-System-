const express = require("express")
const router = express.Router()
const bookcontroller = require("../controllers/book.controller")

router.post("/create",bookcontroller.createbook)
router.get("/getall",bookcontroller.getallbooks)
router.get("/getbyid/:id",bookcontroller.getbyid)
router.get("/search",bookcontroller.searchbook)
router.put("/update/:id",bookcontroller.updatebook)
router.delete("/delete/:id",bookcontroller.deletebook)


module.exports = router