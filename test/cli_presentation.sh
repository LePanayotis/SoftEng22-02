#!/bin/bash

#cd ../cli 

#sudo npm install -g

echo "=====HEALTHCHECK====="
se2202 healthcheck

se2202 login --username abullockt --passw LJE5SC0M3VP

echo "=====QUESTIONNAIRE WITH QUESTIONNAIRE ID = QQ001====="
se2202 questionnaire --questionnaire_id QQ001 --format json

echo "=====ANSWERING QUESTIONNAIRE====="
session_token=`se2202 getsessionid --questionnaire_id QQ001`
se2202 doanswer --questionnaire_id QQ001 --question_id Q0 --session_id $session_token --option_id Q0A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q1 --session_id $session_token --option_id Q1A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q3 --session_id $session_token --option_id Q3A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q4 --session_id $session_token --option_id Q4A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q6 --session_id $session_token --option_id Q6A1

se2202 doanswer --questionnaire_id QQ001 --question_id Q7 --session_id $session_token --option_id Q7A2

se2202 doanswer --questionnaire_id QQ001 --question_id Q8 --session_id $session_token --option_id Q8A1	


echo "=====ANSWERS FOR THE EIGHTH QUESTION IN JSON FORMAT====="
se2202 getquestionanswers --questionnaire_id QQ001 --question_id Q8 --format json

echo "=====ANSWERS FOR THE EIGHTH QUESTION IN CSV FORMAT====="
se2202 getquestionanswers --questionnaire_id QQ001 --question_id Q8 --format csv

echo "=====RESET ALL====="
se2202 resetall

se2202 admin --usermod --username abullockt --passw LJE5SC0M3VP

se2202 login --username abullockt --passw LJE5SC0M3VP

echo "=====INSERT AGAIN THE PREVIOUS QUESTIONNAIRE====="
se2202 questionnaire_upd --source ../data/test.json

echo "=====QUESTIONNAIRE IN JSON FORMAT====="
se2202 questionnaire --questionnaire_id QQ001 --format json

echo "=====AND IN CSV FORMAT====="
se2202 questionnaire --questionnaire_id QQ001 --format csv

se2202 logout