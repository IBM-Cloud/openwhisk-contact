console.log("OpenWhisk Action Fired!");

let helper = require('sendgrid').mail;
let SG_KEY = 'ADD SendGrid API Here'; //SendGrid API Key
let to_email = new helper.Email('your-email@gmail.com'); //Add your email here

function main(params) {
    let subject = `GitHub.io Request FROM: ${params["myName"]}`;
    let from_email = new helper.Email(`${params["myEmail"]}`);

    // Content with full information
    let sysData = new Date();
    let content = `Submitted at ${sysData} -------------------------------- \n\n`;
    content += `Name: ${params["myName"]}\n\n`;
    content += `From: ${params["myEmail"]}\n\n`;
    content += `Suggested Repo: ${params["myUrl"]}\n\n`;
    content += `Description: ${params["myDescription"]}\n\n`;

    let mailContent = new helper.Content('text/plain', content);
    let mail = new helper.Mail(from_email, subject, to_email, mailContent);
    let sg = require('sendgrid')(SG_KEY);

    // Processing the form, if success then send success message back to Frontend and if error then send the error message
    return new Promise((resolve, reject) => {
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            if(error) {
                console.log(error.response.body);
                reject({error: error.message})
            } else {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                resolve({result: 'success'});
            }
        });
    });
}
exports.main = main;