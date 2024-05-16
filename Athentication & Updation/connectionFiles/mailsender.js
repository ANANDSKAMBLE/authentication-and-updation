//sending a mail
var nodemailer=require("nodemailer");

var myMailSide = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',//sender mail
      pass: ''//password
    }
  });


  module.exports=myMailSide;