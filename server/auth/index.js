const { Router } = require("express")
const { login, logout } = require("./auth.controller")


const router = Router();

router.post("/login", login);
router.post("/logout", logout);
module.exports = router;