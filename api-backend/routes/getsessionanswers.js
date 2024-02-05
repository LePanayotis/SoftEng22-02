const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');


router.get('/:questionnaireID/:session', authentication, (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const session = req.params.session;
    const format = req.headers['format'];
    connection.query("SELECT question_id, num_id FROM answers WHERE Q_id = '" + questionnaireID + "' AND \
    session_token = '" + session + "';", function (err, result, fields) {
        if (err) {
            return res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
        }
        else if (result.length != 0) {//If there are answers for this questionnaire from a specific session
            
            if(format === 'csv') {
                var csv = 'questionnaireID, session, question_id, num_id\n';
                for(var i = 0; i < result.length; i++){
                    csv += questionnaireID + ', ' + session + ', ' + result[i].question_id + ',' + result[i].num_id + '\n';
                }
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaireID + '_' + session + '.csv');
                res.status(200).send(csv);
            }
            else{

            //Enlists the answers
            var list = [{ qID: result[0].question_id, ans: result[0].num_id }]
            for (var i = 1; i < result.length; i++) {
                list = list.concat({ qID: result[i].question_id, ans: result[i].num_id })
            }

            //Sends payload
            res.status(200).json({
                "questionnaireID": questionnaireID,
                "session": session,
                "answers": list
            });
            }
        }
        if (result.length === 0) {
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