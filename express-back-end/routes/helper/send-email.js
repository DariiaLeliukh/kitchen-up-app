require("dotenv").config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvitation = (recipientEmail, recipientFirstName, senderFullName, api_recipe_name) => {
  const msg = {
    to: recipientEmail, // Change to your recipient
    from: 'kitchenup.lhl@gmail.com', // Change to your verified sender
    subject: `You were invited for a cooking session at Kitchen-Up!`,
    text: `Hello ${recipientFirstName}. ${senderFullName} is inviting you to cook ${api_recipe_name} in a fun cooking session at Kitchen-up!`,
    html: `Hello ${recipientFirstName}. <strong>${senderFullName}</strong> is inviting you to cook <strong>${api_recipe_name}</strong> in a fun cooking session at Kitchen-up!`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(`Email Server error:`, error.reponse);    
    });
}
 
module.exports = { sendInvitation };