const express = require('express');
const {getUsers, register, login, getOneUser} = require('./apis/user');


const auth = require("../middleware/auth");
const router = express.Router()

router.get("/test/auth", auth, (req, res) => {
    /* 	#swagger.tags = ['Test']
        #swagger.description = 'For testing.' */
    res.send({message: "token success"});
})

router.get("/test", (req, res) => {
    res.send({message: "success"});
})

router.get("/test/db", getUsers)

router.post("/users", register)
router.post("/users/login", login)
router.get("/users/:user_id", getOneUser)

module.exports = router;