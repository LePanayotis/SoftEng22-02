const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const jwt = require('jsonwebtoken');

router.get('/list/:token', (req, res, next) => {
    const token = req.params.token;
    var info = {};
    try {
        info = jwt.verify(token, 'secret');
        info = info.data;
    } catch (err) {
        console.log(err);
        return res.status(402).json({
            status: "failed",
            message: "authentication failed"
        })
    }
    connection.query(`SELECT Q_id, Title, Description FROM Questionnaires WHERE admin_username='${info}'`, function (err, result, fields) {
        if (err) {
            res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
            return;
        } else {
            res.status(200).json(result);
        }

    })
})

router.get('/:questionnaireID', authentication, (req, res, next) => {
    const questionnaireID = req.params.questionnaireID;
    const format = req.headers['format'];
    connection.query("SELECT A.Q_id, A.Title, A.Description, B.question_id, text, type, required FROM Questionnaires A \
    INNER JOIN questions B ON A.Q_id = B.Q_id WHERE A.Q_id = '" + questionnaireID + "' ORDER BY question_id ", function (err, result, fields) {
        if (err) {
            res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
            return;
        }
        else if (result.length != 0) {
            
            if (format === 'csv') {
                var csv = 'questionnaireID, questionnaireTitle, keywords, qID, qtext, type, required \n';
                for (var i = 0; i < result.length; i++) {
                    csv += questionnaireID + ', ' +result[0].Title+ ', ' + result[0].Description + ', ' + result[i].question_id + ','+ result[i].text+',' + result[i].type+',' + result[i].required + '\n';
                }
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=' + questionnaireID + '_' + result[0].Title+ '_' +result[0].Description + '.csv');
                res.status(200).send(csv);
            }
            
            else {

            var list = [{ qID: result[0].question_id, qtext: result[0].text, type: result[0].type, required: result[0].required }]
            for (var i = 1; i < result.length; i++) {
                list = list.concat({ qID: result[i].question_id, qtext: result[i].text, type: result[i].type, required: result[i].required })
            }
            res.status(200).json({
                questionnaireID: result[0].Q_id,
                questionnaireTitle: result[0].Title,
                keywords: result[0].Description,
                questions: list
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