const express = require('express');


const auth = require("../middleware/auth");
const router = express.Router()

router.get("/test", auth, (req, res) => {
    res.send({message: "token success"});
})

module.exports = router;