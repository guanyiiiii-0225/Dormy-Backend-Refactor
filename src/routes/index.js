const express = require('express');
const {getUsers} = require('./apis/user');


const auth = require("../middleware/auth");
const router = express.Router()

router.get("/test/auth", auth, (req, res) => {
    res.send({message: "token success"});
})

router.get("/test", (req, res) => {
    res.send({message: "success"});
})

router.get("/test/db", getUsers)

module.exports = router;