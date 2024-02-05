
const axios = require("axios");
const fs = require("fs");
const env = require("../../env");
const json2csv = require('json2csv').parse;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


async function sendRequestModNew(username, password, firstName, lastName, eMail, date){
    try {
        const response = await axios.post('http://localhost:9103/intelliq_api/admin/usermod/'+ username + '/' + password, {first_name: firstName, last_name: lastName, email: eMail, birth_date: date});
        console.log(response.data);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

async function sendRequestMod(username, password, old_password){
    try {
        const response = await axios.post('http://localhost:9103/intelliq_api/admin/usermod/'+ username + '/' + password, {old_passw: old_password});
        console.log(response.data);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

 async function sendRequestUsers(users, format){
    let tokenValue;
    try{
            tokenValue = fs.readFileSync(env.tokenPath, 'utf8');
    } catch (error) {
         console.error(`An error occurred while trying to read from ${env.tokenPath}: ${error}`);
         process.exit(1);
    }
    try {
        const response = await axios.get('http://localhost:9103/intelliq_api/admin/users/' + users, { "data": {
            "token": tokenValue
          }
        });
        if (format == "json"){ 
            console.log(response.data);
        }
        else if (format == "csv"){
            const csv = json2csv(response.data);
            console.log(csv); 
        }
        else {
            console.log(env.usage);
            process.exit(1);
        }
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    process.exit(0);
}

function adminAuxFunction(usermod, username, password, users, new_user, format) {
    if (usermod && new_user){
        readline.question('Give your first name:', first_name => {
                    readline.question('Give your last name:', last_name => {
                        readline.question('Give your email address:', email => {
                            readline.question('Give your date of birth:', date => {
                                if (password == true){
                                    readline.question('Give your new password:', passw1 => {
                                        readline.question('Give again your password:', passw2 => {
                                            if (passw1 === passw2){
                                                sendRequestModNew(username, passw1, first_name, last_name, email, date);
                                                readline.close();
                                            }
                                            else{
                                                console.log("Passwords don't match!");
                                                process.exit(1);
                                            }
                                    }); 
                                });
                                }
                                else{
                                            sendRequestModNew(username, password, first_name, last_name, email, date);
                                            readline.close();
                                }
        });
        });            
        });
        });
    }

    else if (usermod){
        readline.question('Give your old password:', old_passw => {
                               if (password == true){
                                    readline.question('Give your new password:', passw1 => {
                                        readline.question('Give again your password:', passw2 => {
                                            if (passw1 === passw2){
                                                sendRequestMod(username, passw1, old_passw);
                                                readline.close();
                                            }
                                            else{
                                                console.log("Passwords don't match!");
                                                process.exit(1);
                                            }
                                    }); 
                                });
                                }
                                else{
                                            sendRequestMod(username, password, old_passw);
                                            readline.close();
                                }
        });
    }

    else if (users != undefined && users != true){
        sendRequestUsers(users, format);
    }
    else {
        console.log(env.usage);
        process.exit(1);
    }
}

async function adminFunction(usermod, username, password, users, format) {
    if (usermod == undefined && users == undefined){
        console.log(env.usage);
    }
    let newUser = true;
    if (usermod){
        try {
            if (username== undefined || password == undefined){
                console.log(env.usage);
                process.exit(1);
            }
            const response = await axios.get('http://localhost:9103/intelliq_api/admin/usermod_check/' + username)
            if (response.data.status == "User exists") newUser = false;
        } catch (error) {
            console.error(error);
        }
    }
    adminAuxFunction(usermod, username, password, users, newUser, format);
}



module.exports = { adminFunction };