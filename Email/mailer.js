const sgMail = require('../node_modules/@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

templates = {
    // password_reset_confirm: "d-a02ad738dfc8404c8da016b46a754805",
    // password_reset        : "d-e779dcfad7fb47e7be8d79bdfe75fb0c",
    // confirm_account       : "d-68c570dd120044d894e07566bf951964",
    newuser_invite: "d-a443c31fadb0473095393a1833e1074b"
};

function sendEmail(data) {
    const msg = {
       //extract the email details
       to: data.receiver,
       from: {
           email: data.sender,
           name: "Tardy"
       },
       template_id: "d-a443c31fadb0473095393a1833e1074b",
       //extract the custom fields 
       dynamic_template_data: {
        organizerName: data.organizerName,
        title: data.title,
        location: data.location,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd
       }
     };
     //send the email
     sgMail.send(msg, (error, result) => {
       if (error) {
           console.log(error);
       } else {
           console.log("Email sent!");
       }
     });
 }
 exports.sendEmail = sendEmail;