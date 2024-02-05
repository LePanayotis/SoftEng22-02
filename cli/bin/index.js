#!/usr/bin/env node
const yargs = require("yargs/yargs");
const {hideBin} = require('yargs/helpers');
const axios = require("axios");
const env = require("../env.js");


const functionsDir = "../scopes";

// authentication functions

const authDir = functionsDir+'/auth';

const {loginFunction} = require(authDir + '/login.js');
const {logoutFunction} = require(authDir + '/logout.js');

// admin functions

const adminDir = functionsDir+'/admin';


const {healthCheck} = require(adminDir + '/healthcheck.js');
const {resetAll} = require(adminDir + '/resetall.js');
const {questionnaireUpd} = require(adminDir + '/questionnaire_upd.js');
const {adminFunction} = require(adminDir + '/admin.js');
const {resetQ} = require(adminDir + '/resetq.js');


// operational functions
const operationDir = functionsDir + '/operations';

const {getSessionID} = require(operationDir + '/getsessionid.js');
const {questionnaireFunction} = require(operationDir + '/questionnaire.js');
const {questionFunction} = require(operationDir + '/question.js');
const {doAnswer} = require(operationDir + '/doanswer.js');
const {getSessionAnswers} = require(operationDir + '/getsessionanswers.js');
const {getQuestionAnswers} = require(operationDir + '/getquestionanswers.js');

const argv = yargs(hideBin(process.argv)).argv;

const scope = argv['_'][0];

const arguments = {
    login: [argv.username, argv.passw],
    logout: [],

    admin: [argv.usermod, argv.username, argv.passw, argv.users, argv.format],

    healthcheck: [],
    resetall: [],
    resetq: [argv.questionnaire_id],
    questionnaire_upd : [argv.source],

    questionnaire: [argv.questionnaire_id, argv.format],
    question: [argv.questionnaire_id, argv.question_id, argv.format],
    doanswer: [argv.questionnaire_id, argv.question_id, argv.session_id, argv.option_id],
    getsessionanswers: [argv.questionnaire_id, argv.session_id, argv.format],
    getquestionanswers: [argv.questionnaire_id, argv.question_id, argv.format],
    getsessionid: [argv.questionnaire_id]
};

const functionToCall = {
    login: loginFunction,
    logout: logoutFunction,

    admin: adminFunction,

    healthcheck: healthCheck,
    resetall: resetAll,
    resetq: resetQ,
    questionnaire_upd : questionnaireUpd,

    questionnaire: questionnaireFunction,
    question: questionFunction,
    doanswer: doAnswer,
    getsessionanswers: getSessionAnswers,
    getquestionanswers: getQuestionAnswers,
    getsessionid: getSessionID
};

if (arguments[scope] == undefined){
  console.error(env.usage);
  process.exit(1);

}
else if (Object.keys(argv).length > arguments[scope].length + 2) {
  console.error(env.usage);
  process.exit(1);
}
else if (scope != "admin" && Object.keys(argv).length < arguments[scope].length + 2){
  console.error(env.usage);
  process.exit(1);
}
else if (scope == "admin" && arguments["admin"][0] == true && Object.keys(argv).length != 5){
  console.error(env.usage);
  process.exit(1);
}
else if (scope == "admin" && arguments["admin"][3] != undefined && Object.keys(argv).length != 4){
  console.error(env.usage);
  process.exit(1);
}

functionToCall[scope](...arguments[scope])