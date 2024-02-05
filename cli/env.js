
const http = require('http')

const host = "localhost";
const port = 9103;

const baseURL = '${host}:${port}/intelliq_api';

const tokenPath = "../data/token.txt";

const usage = "\nUsage: se2202 <scope> --param1 <value1> [--param2 <value2> ...] --format <fff>\n\nScope:\n\nadmin [--usermod --username USERNAME --passw PASSWORD] [--users USERNAME --format {json|csv}]\n\nlogin [--username USERNAME --passw PASSWORD]\n\nlogout\n\nhealthcheck\n\nresetall\n\nquestionnaire_upd [--source PATH_FOR_JSON_FILE]\n\nresetq [--questionnaire_id Q_ID]\n\nquestionnaire [--questionnaire_id Q_ID]\n\nquestion [--questionnaire_id Q_ID --question_id QUESTION_ID]\n\ndoanswer [--questionnaire_id Q_ID --question_id QUESTION_ID --session_id SESSION --option_id OPTION]\n\ngetsessionanswers [--questionnaire_id Q_ID --session_id SESSON]\n\ngetquestionanswers [--questionnaire_id Q_ID --question_id QUESTION_ID]\n\n";

module.exports = { baseURL, tokenPath, usage };