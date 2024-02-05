const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');


router.get('/:questionnaireID/:questionID', authentication, (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.headers['format'];
    connection.query("SELECT Q_id, question_id, session_token, num_id \
                      FROM answers \
                      WHERE question_id = '" + questionID + "' AND Q_id = '" + questionnaireID + "' \
                      ORDER BY session_token;"
        , function (err, result, fields) {
            if (err) {
                res.status(500).json({
                    "status": "failed",
                    "reason": err.message
                })
                return;
            }
            else if (result.length != 0) {

                if(format === 'csv') {
                    var csv = 'questionnaireID, questionID, answers\n';
                    for(var i = 0; i < result.length; i++){
                        csv += result[0].Q_id + ', ' + result[0].question_id + ', ' + result[i].session_token + ', ' + result[i].num_id + '\n';
                    }
                    res.setHeader('Content-Type', 'text/csv');
                    res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaireID + '_' + session + '.csv');
                    res.status(200).send(csv);
                }
                else{
                var list = [{ session: result[0].session_token, ans: result[0].num_id }]
                for (var i = 1; i < result.length; i++) {
                    list = list.concat({ session: result[i].session_token, ans: result[i].num_id })
                }
                res.status(200).json({
                    questionnaireID: result[0].Q_id,
                    questionID: result[0].question_id,
                    answers: list
                });
                }
            }
            else {
                res.status(402).json({
                    message: "No data"
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