const { Router } = require("express")
const { createUser, fetchOnlineUser } = require("./user.controller")


const router = Router();

router.post("/register", createUser);
router.get("/online", fetchOnlineUser);

module.exports = router;