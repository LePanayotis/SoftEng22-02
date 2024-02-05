const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cors = require('cors');


//Conection to the mysql database
global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vaseis23',
    database: 'IntelliQ'
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
    }
    else {
        console.log('Database connected');
    }
});


//Routes that will be used in the API
const adminRoutes = require('./routes/admin');
const questionnaireRoutes = require('./routes/questionnaire');
const questionRoutes = require('./routes/question');
const doanswerRoutes = require('./routes/doanswer');
const getsessionanswersRoutes = require('./routes/getsessionanswers');
const getquestionanswersRoutes = require('./routes/getquestionanswers');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const userRoutes = require('./routes/userSession');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//
app.use(cors());
app.use('/intelliq_api/admin', adminRoutes);
app.use('/intelliq_api/questionnaire', questionnaireRoutes);
app.use('/intelliq_api/question', questionRoutes);
app.use('/intelliq_api/doanswer', doanswerRoutes);
app.use('/intelliq_api/getsessionanswers', getsessionanswersRoutes);
app.use('/intelliq_api/getquestionanswers', getquestionanswersRoutes);
app.use('/intelliq_api/login', loginRoutes);
app.use('/intelliq_api/logout', logoutRoutes);
app.use('/intelliq_api/userSession', userRoutes);


//Response to unspecified /intelliq_api endpoint
app.use('/intelliq_api', (req, res, next) => {
    res.status(200).json({
        'message': 'I am listening'
    })
});

//Not found responses
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



module.exports = app;