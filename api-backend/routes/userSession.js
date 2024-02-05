const express = require('express');
const router = express.Router();


//Function that created a random session token of length "length" provided a charset
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

//API POST requests return a 4-digit session token for users to answer to a specific questionnaire
router.post('/', (req, res, next) => {
    try {
        const Q_id = req.body.Q_id;
        const token = makeid(4); //makes the session_token

        connection.query(`INSERT INTO sessions (Q_id, session_token) VALUES ('${Q_id}','${token}')`, function (err, result, fields) {
            if (err) {
                return res.status(500).json({
                    "status": "failed",
                    "reason": err.message
                })
            }
            else {
                return res.status(200).json({
                    token: token
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "status": "failed",
            "reason": err.message
        })
    }
});


module.exports = router;