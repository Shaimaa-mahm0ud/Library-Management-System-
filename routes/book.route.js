const express = require("express")
const router = express.Router()
const bookcontroller = require("../controllers/book.controller")

router.post("/create",bookcontroller.createbook)
router.get("/getall",bookcontroller.getallbooks)
router.get("/getbyid/:id",bookcontroller.getbyid)

module.exports = router