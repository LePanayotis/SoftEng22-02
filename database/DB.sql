DROP DATABASE IntelliQ;

CREATE DATABASE IntelliQ;

USE IntelliQ;

CREATE TABLE Administrators (
  username varchar(255) NOT NULL comment 'A unique username used to identify questionnaire administrators', 
  password varchar(255) NOT NULL comment 'Password to grant access to questionnaire creation and results extraction',
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  birth_date date NOT NULL,
  PRIMARY KEY (username));
CREATE TABLE Questionnaires (
  Q_id           varchar(32) NOT NULL comment 'A varchar value to be used for identification of the questionnaire combined with its administrator username.', 
  Title          varchar(1000) NOT NULL comment 'A varchar value which describes the title of the questionaire', 
  Description    varchar(1500) comment 'A varchar value which has a brief description of the topic of the questionaire.', 
  admin_username varchar(255) NOT NULL comment ' A varchar value which contains the username of the administrator who created the questionaire.', 
  PRIMARY KEY (Q_id));
CREATE TABLE questions (
  Q_id        varchar(32) NOT NULL, 
  question_id varchar(32) NOT NULL comment 'The sequencial number of the question', 
  `text`      varchar(1500) NOT NULL comment 'A varchar value which contains the question', 
  type        varchar(50) NOT NULL, 
  required    varchar(11) NOT NULL, 
  PRIMARY KEY (Q_id, 
  question_id));
CREATE TABLE options (
  Q_id             varchar(32) NOT NULL, 
  question_id      varchar(32) NOT NULL, 
  next_question_id varchar(32) NOT NULL comment 'The id of the next question to be answered', 
  num_id           varchar(32) NOT NULL comment 'An integer value , which is the id of an option', 
  `option`         varchar(1000) NOT NULL comment 'The text to be displayed in the answer option', 
  PRIMARY KEY (Q_id, 
  question_id, 
  num_id));
CREATE TABLE answers (
  Q_id          varchar(32) NOT NULL, 
  question_id   varchar(32) NOT NULL, 
  num_id        varchar(32) NOT NULL, 
  session_token varchar(200) NOT NULL comment 'A varchar value, that identifies the specific session instance, which was used by a user to answer a question', 
  PRIMARY KEY (Q_id, 
  question_id, 
  session_token));

CREATE TABLE sessions ( 
  Q_id varchar(32) NOT NULL, 
  session_token varchar(200) NOT NULL,
  PRIMARY KEY (Q_id , session_token)
);

ALTER TABLE sessions ADD CONSTRAINT FKsession FOREIGN KEY (Q_id) REFERENCES Questionnaires (Q_id) ON UPDATE Cascade ON DELETE Cascade;

ALTER TABLE questions ADD CONSTRAINT FKquestions985506 FOREIGN KEY (Q_id) REFERENCES Questionnaires (Q_id) ON UPDATE Cascade ON DELETE Cascade;
ALTER TABLE Questionnaires ADD CONSTRAINT FKQuestionna70732 FOREIGN KEY (admin_username) REFERENCES Administrators (username) ON UPDATE Cascade ON DELETE Cascade;
ALTER TABLE options ADD CONSTRAINT FKoptions116261 FOREIGN KEY (Q_id, question_id) REFERENCES questions (Q_id, question_id) ON UPDATE Cascade ON DELETE Cascade;
ALTER TABLE answers ADD CONSTRAINT FKanswers956483 FOREIGN KEY (Q_id, question_id, num_id) REFERENCES options (Q_id, question_id, num_id) ON UPDATE Cascade ON DELETE Cascade;
ALTER TABLE answers ADD CONSTRAINT FKanswerssession FOREIGN KEY (Q_id, session_token) REFERENCES sessions (Q_id ,session_token) ON UPDATE Cascade ON DELETE Cascade;

insert into Administrators (username, password, first_name, last_name, email, birth_date) values ('abullockt', 'LJE5SC0M3VP', 'Alasdair', 'Bullock', 'abullockt@usgs.gov', '2022-07-14');
insert into Administrators (username, password, first_name, last_name, email, birth_date) values ('panagiotis', '12345', 'Panagiotis', 'Papagiannakis', 'p.papagiannakis@protonmail.com', '2001-12-23');
insert into Administrators (username, password, first_name, last_name, email, birth_date) values ('giorgos','12345','Giorgos','Triantafyllis','el19440@mail.ntua.gr','2001-04-04');
insert into Questionnaires (Q_id, Title, Description, admin_username) values ('0000','MY QUESTIONNAIRE', 'A DESCRIPTION', 'panagiotis');
insert into Questionnaires (Q_id, Title, Description, admin_username) values ('ffff','MY SECOND QUEST', 'A DESCRIPTION', 'giorgos');

insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q0', 'Ποια είναι η ηλικία σας;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q1', 'Ποιο είναι το αγαπημένο σας χρώμα','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q2', 'Ασχολείστε με το ποδόσφαιρο;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q3', 'Τι ομάδα είστε','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q4', 'Έχετε ζήσει σε νησί;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q5', 'Είστε χειμερινός κολυμβητής','question','1');

insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q6', 'Ποια η σχέση σας με το θαλάσιο σκι;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q7', 'Κάνετε χειμερινό σκι;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q8', 'Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('0000', 'Q9', 'Προτιμάτε τη χειμερινή ή τη θερινή ώρα;?','question','1');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q0', 'Q1', '1','<30');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q0', 'Q1', '2','30-50');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q0', 'Q1', '3','50-70');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q0', 'Q1', '4','>70');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q1', 'Q2', '1','Πράσινο');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q1', 'Q2', '2','Κόκκινο');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q1', 'Q2', '3','Κίτρινο');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q2', 'Q3', '1','Ναι');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q2', 'Q4', '2','Όχι');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q3', 'Q4', '1','Παναθηναϊκός');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q3', 'Q4', '2','ΠΑΟΚ');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q3', 'Q4', '3','Ολυμπιακός');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q4', 'Q5', '1','Όχι');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q4', 'Q6', '2','Ναι');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q6', 'Q5', '1','Καμία');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q6', 'Q5', '2','Μικρή');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q6', 'Q5', '3','Μεγάλη');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q5', 'Q7', '1','Ναι');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q5', 'Q7', '2','Όχι');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q7', 'Q8', '1','Σπάνια');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q7', 'Q8', '2','Περιστασιακά');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q7', 'Q8', '3','Τακτικά');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q8', 'Q9', '1','Ναι');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q8', '-', '2','Όχι');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q9', '-', '1','Χειμερινή');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('0000', 'Q9', '-', '2','Θερινή');

insert into Questionnaires (Q_id, Title, Description, admin_username) values ('cheers','Survey on wine', 'A survey for public`s taste in wine', 'panagiotis');

insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q0', 'Είστε άνω των 18 ετών','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q1', 'Προτιμάτε το λευκό ή το ερυθρό κρασί;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q2', 'Ποια είναι η αγαπημένη σας λευκή ποικιλία;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q3', 'Ποια είναι η αγαπημένη σας ερυθρή ποικιλία;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q4', 'Ποια η γνώμη σας για τα fumé λευκά κρασιά;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q5', 'Σας αρέσουν τα παλαιωμένα ή τα νεαρά κρασιά;','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q6', 'Ποια βαρέλια προτιμάτε για παλαίωση','question','1');
insert into questions (Q_id, question_id, text, type, required) values ('cheers', 'Q7', 'Πόσα ποτήρια κρασί καταναλώνετε;','question','1');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q0', 'Q1', '1','Ναι');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q0', '-', '2','Όχι');


insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q1', 'Q2', '1','Λευκό');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q1', 'Q3', '2','Ερυθρό');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q2', 'Q4', '1','Chardonnay');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q2', 'Q4', '2','Sauvignon Blanc');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q2', 'Q4', '3','Ξινόμαυρο Blanc de Noirs');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q4', 'Q7', '1','Μου αρέσουν');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q4', 'Q7', '2','Δεν μου αρέσουν');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q7', '-', '1','Μερικά την εβδομάδα');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q7', '-', '2','Μερικά τον μήνα');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q7', '-', '3','Ένα την ημέρα');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q3', 'Q5', '1','Cabernet Sauvignon');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q3', 'Q5', '2','Pinot Noir');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q3', 'Q5', '3','Αγιωργίτικο');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q5', 'Q6', '1','Παλαιωμένα');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q5', 'Q7', '2','Νεαρά');

insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q6', 'Q7', '1','Αμερικάνικης δρυός');
insert into options (Q_id, question_id, next_question_id, num_id, `option`) values ('cheers', 'Q6', 'Q7', '2','Γαλλικής δρυός');