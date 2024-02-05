let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var newQ = require('./test_data');
let should = chai.should();
var token;
var session_token;


chai.use(chaiHttp);


describe('Test all API endpoints', () => {

      describe('/login', () => {
      it('Perform Login with username and password', (done) => {
        const user = {
          username: "abullockt",
          password: "LJE5SC0M3VP"
        }
        chai.request(server)
            .post('/intelliq_api/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('token');
                  token = res.body.token;
              done();
            });
      });
  });
    
      describe("/admin/healthcheck", () => {
      it("Check the database connection", (done) => {
        chai.request(server)
            .get('/intelliq_api/admin/healthcheck')
            .end((err, res) => {
                  res.should.have.status(200);                
              done();
            });
      });
    });

    describe("/admin/questionnaire_upd", () => {
      it("Test new questionnaire insertion to the database", (done) => {
        newQ.token = token;
        chai.request(server)
            .post('/intelliq_api/admin/questionnaire_upd')
            .send(newQ)
            .end((err, res) => {
                  res.should.have.status(200);                                 
              done();
            });
      });
    });



    describe("/userSession", () => {
      it("Test if it returns a 4-digit session token for users to answer to a specific questionnaire ", (done) => {
        chai.request(server)
            .post('/intelliq_api/userSession')
            .send({'Q_id': 'QQ002'})
            .end((err, res) => {
                  res.should.have.status(200);    
                  res.body.should.have.property('token');     
                  session_token = res.body.token;         
              done();
            });
      });
    });


    describe("/do_answer", () => {
      it("performs post which registers an answer to a specific question", (done) => {
        chai.request(server)
            .post('/intelliq_api/doanswer/QQ002/Q0/' + session_token + '/Q0A1')
            .end((err, res) => {
                  res.should.have.status(200);  
                  res.body.should.have.property('message');       
              done();
            });
      });
    });
  
  
    describe("/intelliq_api/getquestionanswers", () => {
      it("Test for return of question answers", (done) => {
        chai.request(server)
            .get('/intelliq_api/getquestionanswers/QQ002/Q0')
            .send({token: token})
            .end((err, res) => {
                  res.should.have.status(200); 
                  res.body.should.have.property('questionnaireID');
                  res.body.should.have.property('questionID');
                  res.body.should.have.property('answers');              
              done();
            });
      });
    });


    describe("/getsessionanswers", () => {
      it("performs get which returns all the answers at a questionaire during a session", (done) => {
        chai.request(server)
            .get('/intelliq_api/getsessionanswers/QQ002/' + session_token + '')
            .send({token: token})
            .end((err, res) => {
                  res.should.have.status(200);    
                  res.body.should.have.property('questionnaireID');      
                  res.body.should.have.property('session');
                  res.body.should.have.property('answers');
              done();
            });
      });
    });
  
  
    describe("/question", () => {
      it("performs get which returns an object with the data of a specific question)", (done) => {
        chai.request(server)
            .get('/intelliq_api/question/QQ002/Q0')
            .end((err, res) => {
                  res.should.have.status(200);  
                  res.body.should.have.property('questionnaireID');
                  res.body.should.have.property('qID');              
                  res.body.should.have.property('qtext');
                  res.body.should.have.property('required');
                  res.body.should.have.property('type');
                  res.body.should.have.property('options');
              done();
            });
      });
    });
  
  
    describe("/questionnaire", () => {
      it("performs get which returns an object with the questions of a specific questionnaire)", (done) => {
        chai.request(server)
            .get('/intelliq_api/questionnaire/QQ002')
            .send({token: token})
            .end((err, res) => {
                  res.should.have.status(200);        
                  res.body.should.have.property('questionnaireID');
                  res.body.should.have.property('questionnaireTitle');
                  res.body.should.have.property('keywords');
                  res.body.should.have.property('questions');                  
              done();
            });
      });
    });
  
  
    describe("/resetq/:questionnaireID", () => {
      it("Test deletion of all answers from a questionnaire", (done) => {
        chai.request(server)
            .post('/intelliq_api/admin/resetq/QQ002')
            .send({token: token})
            .end((err, res) => {
                  res.should.have.status(200);                
              done();
            });
      });
    });
  
  
    describe("/usermod_check/:username", () => {
      it("Test Admin existence", (done) => {
        chai.request(server)
            .get('/intelliq_api/admin/usermod_check/abullockt')
            .end((err, res) => {
                  res.should.have.status(200);     
                  res.body.should.have.property('status');           
              done();
            });
      });
    });
  
  
    describe("/resetall", () => {
      it("Check deletion of database", (done) => {
        chai.request(server)
            .post('/intelliq_api/admin/resetall')
            .send({token: token})
            .end((err, res) => {
                  res.should.have.status(200);                
              done();
            });
      });
    });
  
    
});


module.exports = server
