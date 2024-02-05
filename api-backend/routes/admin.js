const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');


// This endpoint informs the client of the status of connection of the server to the database
router.get('/healthcheck', (req, res, next) => {
    if (connection.state === 'disconnected') {
        res.status(500).json({
            "status": "failed",
            "dbconnection": "host: 'localhost', user: 'root', password: 'vaseis23', database: 'IntelliQ'"
        });
    }
    else {
        res.status(200).json({
            "status": "OK",
            "dbconnection": "host: 'localhost', user: 'root', password: 'vaseis23', database: 'IntelliQ'"
        });
    }
});


//Adds new questionnaire to the database
router.post('/questionnaire_upd', authentication, async (req, res, next) => {
    var info;
    try {
        //Extracts JSON from the token provided in the body
        //and verifies if user is authorised
        info = jwt.verify(req.body.token, 'secret');
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }

    //Retreives the parametres
    const username = info.data;
    const Q_id = req.body.questionnaireID;
    const Title = req.body.questionnaireTitle;
    const keywords = req.body.keywords;
    const quest = req.body.questions;
    var temp = { value: false };
    //First insert into Questionnaire table, new questionnaire's attributes
    connection.query("INSERT INTO Questionnaires (Q_id, Title, Description, admin_username) \
    VALUES ('" + Q_id + "', '" + Title + "', '" + keywords +
        "', '" + username + "')", function (err, result, fields) {
            if (err) {
                temp.value = true;
                temp.message = err.sqlMessage;
            }
            //Add each question of the questionnaire to the questions table
            if (!temp.value) {
                for (var i = 0; i < quest.length; i++) {
                    const questInstance = quest[i];
                    const qID = questInstance.qID;
                    const qtext = questInstance.qtext;
                    const required = questInstance.required;
                    const type = questInstance.type;
                    const opt = questInstance.options;

                    connection.query("INSERT INTO questions (Q_id, question_id, text, type, required) \
        VALUES ('" + Q_id + "', '" + qID + "', '" + qtext +
                        "', '" + type + "', '" + required + "')", function (err, result, fields) {
                            if (err) {
                                temp.value = true;
                                temp.message = err.sqlMessage;
                            }
                            //Then for each option of the question, add it to the options table
                            if (!temp.value) {
                            for (var j = 0; j < opt.length; j++) {
                                const option = opt[j];
                                const optID = option.optID;
                                const opttxt = option.opttxt;
                                const nextqID = option.nextqID;

                                if (!temp.value) {
                                connection.query("INSERT INTO `options` (Q_id, question_id, next_question_id, num_id, `option`) \
        VALUES ('" + Q_id + "', '" + qID + "', '" + nextqID +
                                    "', '" + optID + "', '" + opttxt + "')", function (err, result, fields) {
                                        if (err) {
                                            temp.value = true;
                                            temp.message = err.sqlMessage;
                                        }

                                    });
                                }
                            }
                        }
                        });
                }
            }
            if (temp.value) {
                return res.status(500).json({
                    status: "failed",
                    "reason": temp.message
                });
            } else {
                return res.status(200).json({
                    "status": "Questionnaire added",
                });
            }
        });
});



//An API endpoint to delete everything from the database
router.post('/resetall', authentication, (req, res, next) => {
    //Delete all answers
    connection.query("DELETE FROM answers;", function (err, result, fields) {
        if (err) {
            res.status(500).json({
                "status": "failed",
                "reason": err.message
            });
            return;
        }

        //Delete all options
        connection.query("DELETE FROM options;", function (err, result, fields) {
            if (err) {
                res.status(500).json({
                    "status": "failed",
                    "reason": err.message
                });
                return;
            }

            //Delete all questions
            connection.query("DELETE FROM questions;", function (err, result, fields) {
                if (err) {
                    res.status(500).json({
                        "status": "failed",
                        "reason": err.message
                    });
                    return;
                }

                    //Delete all sessions (of users answers to Questionnaires)
                    connection.query("DELETE FROM sessions;", function (err, result, fields) {
                        if (err) {
                            res.status(500).json({
                                "status": "failed",
                                "reason": err.message
                            });
                            return;
                        }

                        //All queries were successful
                        return res.status(200).json({
                            "status": 'OK'
                        });
                    });

                //Delete all Questionnaires
                connection.query("DELETE FROM Questionnaires;", function (err, result, fields) {
                    if (err) {
                        res.status(500).json({
                            "status": "failed",
                            "reason": err.message
                        });
                        return;
                    }

                    //Delete all admins
                    connection.query("DELETE FROM Administrators;", function (err, result, fields) {
                        if (err) {
                            res.status(500).json({
                                "status": "failed",
                                "reason": err.message
                            });
                            return;
                        }


                    });
                });
            });
        });
    });
});

//API endpoint for deleting all answers from a questionnaire
//The questionnaire ID is provided as a parametre and the authentication token is in the body
router.post('/resetq/:questionnaireID', authentication, (req, res, next) => {

    const id = req.params.questionnaireID //Get Q_id from the parametres
    //Delete all answers of the questionnaire
    connection.query("DELETE FROM answers WHERE Q_id = '" + id + "';", function (err, result, fields) {
        if (err) {
            console.log(err.sqlMessage);
            return res.status(500).json({
                "status": "failed",
                "reason": err.sqlMessage
            })
        } else {
            //Delete all sessions related to the given Q_id
            connection.query("DELETE FROM sessions WHERE Q_id = '" + id + "';", function (err, result, fields) {
                if (err) {
                    console.log(err.sqlMessage);
                    return res.status(500).json({
                        "status": "failed",
                        "reason": err.sqlMessage
                    })
                }
                else {
                    return res.status(200).json({
                        "status": "OK",
                    })
                }
            });
        }
    });

});

//API endpoint that checks if a particular admin exists
router.get('/usermod_check/:username', (req, res, next) => {
    const username = req.params.username;
    connection.query("SELECT * FROM Administrators WHERE username = '" + username + "';", function (err, result, fields) {
        if (err) {
            res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
            return;
        }
        else if (result.length != 0) {
            return res.status(200).json({
                "status": "User exists"
            });
        }
        else {
            //Status code should be 200, even if the query doesn't return data because the info I need is just if user exists or not.
            return res.status(200).json({
                "status": "No such user"
            });
        }
    });
});


router.post('/usermod/:username/:password', (req, res, next) => {
    const username = req.params.username;
    const pass = req.params.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const birth_date = req.body.birth_date;
    const old_password = req.body.old_passw;
    connection.query("SELECT * FROM Administrators WHERE username = '" + username + "';", function (err, result, fields) {
        if (err) {
            return res.status(500).json({
                "status": "failed",
                "reason": err.message
            })
        }
        else if (result.length != 0) {
            connection.query("SELECT * FROM Administrators WHERE username = '" + username + "' AND password = '" + old_password + "';", function (err, result, fields) {
                if (err) {
                    return res.status(500).json({
                        "status": "failed",
                        "reason": err.message
                    });
                }
                else if (result.length == 0) {
                    return res.status(401).json({
                        "status": "Wrong Password"
                    });
                }
                else {
                    connection.query("UPDATE Administrators SET password =  '" + pass + "' WHERE username = '" + username + "';", function (err, result, fields) {
                        if (err) {
                            return res.status(500).json({
                                "status": "failed",
                                "reason": err.message
                            });
                        }
                        else {
                            return res.status(200).json({
                                "status": "Password Changed"
                            });
                        }
                    });
                }

            });

        }
        else {

            connection.query("INSERT INTO Administrators (username, password, first_name, last_name, email, birth_date) VALUES \
                                ('" + username + "', '" + pass + "', '" + first_name + "', '" + last_name + "', '" + email + "', '" + birth_date + "')", function (err, result, fields) {
                if (err) {
                    return res.status(500).json({
                        "status": "failed",
                        "reason": err.message
                    })
                }
                else {
                    return res.status(200).json({
                        "status": "New User Created"
                    })
                }
            });
        }
    });
});


router.get('/users/:username', authentication, (req, res, next) => {
    const user = req.params.username;
    connection.query("SELECT username, first_name, last_name, email, birth_date FROM Administrators \
                      WHERE username = '" + user + "';"
        , function (err, result, fields) {
            if (err) {
                return res.status(500).json({
                    "status": "failed",
                    "reason": err.message
                })
            }
            else if (result.length === 1) {
                return res.status(200).json({
                    "username": result[0].username,
                    "first_name": result[0].first_name,
                    "last_name": result[0].last_name,
                    "email": result[0].email,
                    "birth_date": result[0].birth_date
                })
            }
            else {
                res.status(401).json({
                    message: "Not Authorised"
                })
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