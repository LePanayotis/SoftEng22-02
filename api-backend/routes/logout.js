const express = require('express');
const router = express.Router();

//Placebo effect
router.post('/', (req, res, next) => {
    return res.status(200).json({
        message: "You have successfully logged out"
    })
});



module.exports = router;