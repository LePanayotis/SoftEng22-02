#!/bin/bash

se2202 login --username abullockt --passw LJE5SC0M3VP

se2202 questionnaire_upd --source ../data/test2.json

se2202 questionnaire --questionnaire_id QQ002 --format json

se2202 question --questionnaire_id QQ002 --question_id Q0 --format json

se2202 question --questionnaire_id QQ002 --question_id Q1 --format json

se2202 question --questionnaire_id QQ002 --question_id Q2 --format json

se2202 question --questionnaire_id QQ002 --question_id Q3 --format json

se2202 question --questionnaire_id QQ002 --question_id Q4 --format json

se2202 questionnaire --questionnaire_id QQ002 --format csv

se2202 question --questionnaire_id QQ002 --question_id Q0 --format csv

se2202 question --questionnaire_id QQ002 --question_id Q1 --format csv

se2202 question --questionnaire_id QQ002 --question_id Q2 --format csv

se2202 question --questionnaire_id QQ002 --question_id Q3 --format csv

se2202 question --questionnaire_id QQ002 --question_id Q4 --format csv

se2202 logout