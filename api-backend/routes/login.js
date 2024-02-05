const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/', (req, res, next) => {

    //Retrieves username and password from the body
    const username = req.body.username;
    const password = req.body.password;

    //Performs query to check if credentials are correct
    connection.query("SELECT * FROM Administrators WHERE username = '" + username + "' AND password = '" + password + "'"
        , function (err, result, fields) {
            if (err) {
                return res.status(500).json({
                    "status": "failed",
                    "reason": err.message
                })
            }
            else if (result.length === 1) {
                //If credentials correct then gets token
                const token = jwt.sign({ data: username }, 'secret', { expiresIn: "1h" });
                return res.status(200).json({
                    token: token
                })
            }
            else {
                return res.status(401).json({
                    "status": "Not authorized",
                })
            }
        });
});



module.exports = router;