const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Submit answer of a specific session for a question
router.post('/:questionnaireID/:questionID/:session/:optionID', (req, res, next) => {

    //Retrieve  data from parametres
    const optionID = req.params.optionID;
    const session = req.params.session;
    const questionID = req.params.questionID;
    const questionnaireID = req.params.questionnaireID;

    //Perform insert query
    connection.query("INSERT INTO answers (Q_id, question_id, num_id, session_token) VALUES ('" + questionnaireID + "', \
        '" + questionID + "', '" + optionID + "', '" + session + "')", function (err, result, fields) {
        if (err) {
            return res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
        } else {
            return res.status(200).json({
                "message": "DONE"
            });
        }
    });
});



router.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = router;