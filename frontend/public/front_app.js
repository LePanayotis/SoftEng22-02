const express = require('express');
const front_app = express();
var path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

front_app.use(bodyParser.urlencoded({ extended: false }));
front_app.use(bodyParser.json());

front_app.get('/', (req, res, next) => {
    res.status(200).redirect('/home');
});

front_app.use('/home', (req, res, next) => {
    res.status(200).render('home.ejs');
});

const URL = 'http://127.0.0.1:9103/intelliq_api';

front_app.get('/questionnaire', async (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    await axios.post(URL + '/userSession', { Q_id: id })
        .then((response) => {
            const token = response.data.token;
            res.redirect(`/question/${id}/Q0/${token}`);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).render('404.ejs', { pageTitle: '500 Questionnaire not found' });
        })
});

// /:questionnaireID/:questionID/:session/:optionID
front_app.get('/question/:Q_id/:question_id/:token', async (req, res, next) => {
    try {
        const Q_id = req.params.Q_id;
        const token = req.params.token;
        const question = req.params.question_id;
        await axios.get(URL + `/question/${Q_id}/${question}`)
            .then(response => {
                response.data["token"] = token;
                console.log(response.data);
                res.render('question.ejs', response.data);
            });
    } catch (err) {
        console.error(err);
        res.status(404).render('404.ejs', { pageTitle: '404 Could not get question', message: err });
    }
});

front_app.post('/submitans', async (req, res, next) => {
    const Q_id = req.body.questionnaireID;
    const token = req.body.session;
    const optID = JSON.parse(req.body.selection).optID;
    const nextqID = JSON.parse(req.body.selection).nextqID;
    await axios.post(URL + `/doanswer/${Q_id}/${req.body.qID}/${token}/${optID}`);
    if (nextqID === '-') {
        res.status(200).redirect('/thankyou');
    }
    else {
        res.redirect(`/question/${Q_id}/${nextqID}/${token}`);
    }
});

front_app.get('/thankyou', (req, res, next) => {
    res.status(200).render('thanks.ejs');
});

front_app.post('/login', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    await axios.post(URL + '/login', { username: username, password: password })
        .then((response) => {
            const token = response.data.token;
            res.status(200).redirect(`/dashboard/${token}`);
        })
        .catch((error) => {
            console.log("Authorization failed");
            res.status(401).redirect('/home');
        })
})

front_app.get('/dashboard/:token', async (req, res, next) => {
    const token = req.params.token;
    try {
        const response = await axios.get(URL + `/questionnaire/list/${token}`);
        console.log({ questionnaires: response.data, token: token });
        return res.render('dashboard.ejs', { questionnaires: response.data, token: token });
    } catch (err) {
        console.error(err);
        return res.status(500).render('404.ejs', { pageTitle: '500' });
    }
});

front_app.get('/reset', async (req, res, next) => {
    const token = req.query.token;
    const Q_id = req.query.Q_id;
    try {
        const response = await axios.post(URL + `/admin/resetq/${Q_id}`, { token: token });
        console.log(response.data);
        return res.status(200).redirect(`/dashboard/${token}`);
    } catch (error) {
        console.error(error);
    }
});

front_app.post('/newquestionnaire', async (req, res, next) => {
    console.log(req.body);
    const quest = req.body.qjson;
    quest["token"] = req.body.token;
    console.log(quest);
    try {
        const response = await axios.post(URL + `/admin/questionnaire_upd`, quest);
        console.log(response.data);
        return res.status(200).redirect(`/dashboard/${req.body.token}`);
    } catch (err) {
        console.log(err.data);
        return res.status(500).render('404.ejs', { pageTitle: '500' });
    }
})

front_app.use((req, res, next) => { res.status(404).render('404.ejs', { pageTitle: '404' }) })

front_app.use(express.static("public"));


module.exports = front_app;