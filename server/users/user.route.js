const { Router } = require("express")
const { createUser } = require("./user.controller")


const router = Router();

router.post("/register", createUser);

module.exports = router;