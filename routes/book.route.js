const express = require("express")
const router = express.Router()
const bookcontroller = require("../controllers/book.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/create",authMiddleware,adminMiddleware,bookcontroller.createbook)
router.get("/getall",bookcontroller.getallbooks)
router.get("/getbyid/:id",bookcontroller.getbyid)
router.get("/search",bookcontroller.searchbook)
router.put("/update/:id",authMiddleware,adminMiddleware,bookcontroller.updatebook)
router.delete("/delete/:id",authMiddleware,adminMiddleware,bookcontroller.deletebook)


module.exports = router