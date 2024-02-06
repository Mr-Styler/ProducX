const router = require("express").Router();
const PublicController = require("../controllers/public");

router.get("/", PublicController.getHome)

router.get("/about", PublicController.getAbout)

router.get("/services", PublicController.getServices)

router.get("/contact", PublicController.getContact)

module.exports = router