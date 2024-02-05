# Software Engineering Project 2022-2023

Group: softeng2022-02

This repository implements intelliQ. It is our project
for ECE NTUA Software Engineering class of 2022-2023. 
IntelliQ is a software for creating, sharing and answering personalised
questionnaires. It's innovation is that it allows questionnaire creators to
adjust the flow of questions according to the users' previous answers.

Enjoy!

What you will need to run it in your system:
    NodeJS: v16.15.0
    MySQL Server v8.0.32

First install MySQL Server and set the password of the  root user
to 'vaseis23' and import the schema of the database located in ./database/DB.sql
You can adjust the MySQL server connection configuration in ./api-backend/app.js

To start the API server after you have set up the MySQL database
perform the command "node server" on a command prompt window with ./backend-server 
working directory

Once the API server is up and running, from a second command prompt window
set working directory to ./frontend/public and perform command "node server".
Congratulations, your frontend server is up and running on localhost port 80.

Go to your browser and set URL to http://localhost/ and have fun!

Make sure you have used the endpoints provided in the API to
create a new administrator account, so as to create your questionnaires.

DISCLAIMER
======================================================================
Neither the creators nor NTUA are responsible for potential (and highly likely)
malfunction!

## Update 5/2/2024

This code is honestly ugly. It's a last minuter project!
I just uploaded so that I beautify it in the future.