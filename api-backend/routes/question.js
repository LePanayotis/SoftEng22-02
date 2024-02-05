const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

//API endpoint to get Question questionID from Questionnaire questionnaireID
router.get('/:questionnaireID/:questionID', (req, res, next) => {

    //Retrieves id from parametres
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const format = req.headers['format'];

    //Performs select query
    connection.query("SELECT A.Q_id, A.question_id, A.text, A.required, A.type, B.num_id, B.`option`, B.next_question_id\
    FROM questions A \
    INNER JOIN options B \
    ON (B.question_id = A.question_id AND B.Q_id = A.Q_id) \
    WHERE A.Q_id = '" + questionnaireID + "' AND A.question_id = '" + questionID + "'\
    ORDER BY B.num_id;", function (err, result, fields) {
        if (err) {

            //Internal error
            return res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
        }
        else if (result.length != 0) { //if there is a question identified

            
            if (format === 'csv') {
                var csv = 'questionnaireID, qID, qtext, required,type, optID , opttxt, nextqID\n';
                for (var i = 0; i < result.length; i++) {
                    csv += questionnaireID + ', ' + questionID + ', ' + result[0].text + ',' + result[0].required + ',' +  result[0].type + 
                    ',' +result[i].num_id + result[i].option + ',' +result[i].next_question_id + '\n';
                }
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaireID + '_' + questionID + '_' + result[0].text +'_' + result[0].required +'_' + result[0].type +'.csv');
                res.status(200).send(csv);
            
            }


            else { 

            //Enlish all its options
            var list = [{ optID: result[0].num_id, opttxt: result[0].option, nextqID: result[0].next_question_id }]
            for (var i = 1; i < result.length; i++) {
                list = list.concat({ optID: result[i].num_id, opttxt: result[i].option, nextqID: result[i].next_question_id })
            }
            //Send 200 OK with payload
            res.status(200).json({
                questionnaireID: result[0].Q_id,
                qID: result[0].question_id,
                qtext: result[0].text,
                required: result[0].required,
                type: result[0].type,
                options: list
            });

            }

        }
        else {
            //Repsonse length is 0
            res.status(402).json({
                message: "No data"
            });
        }
    });
});

//Not found
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