#!/bin/bash

se2202 login --username abullockt --passw LJE5SC0M3VP

session_token=`se2202 getsessionid --questionnaire_id QQ001`

se2202 doanswer --questionnaire_id QQ001 --question_id Q0 --session_id $session_token --option_id Q0A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q1 --session_id $session_token --option_id Q1A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q2 --session_id $session_token --option_id Q2A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q3 --session_id $session_token --option_id Q3A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q5 --session_id $session_token --option_id Q5A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q6 --session_id $session_token --option_id Q6A3

se2202 doanswer --questionnaire_id QQ001 --question_id Q7 --session_id $session_token --option_id Q7A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q8 --session_id $session_token --option_id Q8A1	

se2202 getsessionanswers --questionnaire_id QQ001 --session_id $session_token --format json

se2202 resetq --questionnaire_id QQ001

session_token=`se2202 getsessionid --questionnaire_id QQ001`

se2202 doanswer --questionnaire_id QQ001 --question_id Q0 --session_id $session_token --option_id Q0A3

se2202 doanswer --questionnaire_id QQ001 --question_id Q1 --session_id $session_token --option_id Q1A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q3 --session_id $session_token --option_id Q3A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q5 --session_id $session_token --option_id Q5A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q6 --session_id $session_token --option_id Q6A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q7 --session_id $session_token --option_id Q7A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q8 --session_id $session_token --option_id Q8A1

se2202 getsessionanswers --questionnaire_id QQ001 --session_id $session_token --format json

session_token=`se2202 getsessionid --questionnaire_id QQ001`

se2202 doanswer --questionnaire_id QQ001 --question_id Q0 --session_id $session_token --option_id Q0A3

se2202 doanswer --questionnaire_id QQ001 --question_id Q1 --session_id $session_token --option_id Q1A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q3 --session_id $session_token --option_id Q3A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q4 --session_id $session_token --option_id Q4A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q6 --session_id $session_token --option_id Q6A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q7 --session_id $session_token --option_id Q7A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q8 --session_id $session_token --option_id Q8A2

se2202 getsessionanswers --questionnaire_id QQ001 --session_id $session_token --format csv

se2202 getquestionanswers --questionnaire_id QQ001 --question_id Q8 --format csv
se2202 logout