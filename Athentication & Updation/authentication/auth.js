const mysql = require('mysql');
const express = require('express');
const auth = express();
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");

const data = require('C:/Users/Anand S Kamble/Desktop/html/connectionFiles/database.js');

const mail = require('C:/Users/Anand S Kamble/Desktop/html/connectionFiles/mailsender.js')



auth.use(express.json());




auth.post('/sendOTP', (req, res) => {
    console.log(req.body);
    const { mobile_number, DOB } = req.body;
	//validating input data
    if (mobile_number.length == 10 && mobile_number[0] >= 6 && DOB.length == 10 && /^\d{4}-\d{2}-\d{2}$/.test(DOB))
    {
        var emailQuery = `call validationdata(?,?)`;
        data.query(emailQuery, [mobile_number, DOB], (err, resultSet) => {
            if (err)     
            {
                res.status(400).json(
                    {   "status": "false", 
                        "message": err 
                    });
            }
            else 
            {
                var value = resultSet[0][0].mail;
                switch (value) 
                {
                    case null: 
                        res.status(400).json(
                            {   "status": "false", 
                                "message": "no mail found" 
                            });
                    return;
                    
                    default:
                        const randomOTP = Math.floor(Math.random() * 1000000);
                        console.log(resultSet[0][0].mail)


                        var mailDetails =
                        {
                            from: '',//mailadress
                            to: `${resultSet[0][0].mail}`,
                            subject: 'OTP for login verification',
                            text: `Your OTP is: ${randomOTP} valid for 10 minutes`
                        };

                        mail.sendMail(mailDetails, function (error, info) {
                            if (error)
                            {
                                res.status(400).json(
                                    {    "status": "false",
                                         "message": error 
                                    });
                            }
                            else 
                            {
                                
				//insert data 
                                var insertOTP = `call insertOTP(?,?)`;
                                data.query(insertOTP, [mobile_number, randomOTP], (err, result) => {
                                    if (err) 
                                    {
                                        res.status(400).json(
                                            {   "status": "false",
                                                "message": error 
                                            });
                                    }
                                    else 
                                    {
                                        
                                        res.status(200).json(
                                            {   "status": "true",
                                                 "message": "OTP sent successfully!" 
                                            }); 
                                    }
                                })
                            }
                        });
                        return;

                }
            }
        })
    }
    else 
    {
        res.status(400).json(
            {   "status": "false",
                "message": "enter proper number" 
            })
    }
})






auth.post('/verifyOTP', (req, res) => {
    const { mobile_number, DOB, OTP } = req.body;
    if (mobile_number.length == 10 && mobile_number[0] >= 6 && DOB.length == 10 && /^\d{4}-\d{2}-\d{2}$/.test(DOB) && OTP.length==6)
    {
        var verify = `call verifyOTP(?,?,?)`;
        data.query(verify, [mobile_number, DOB, OTP], (err, result) => {
            if (err) 
            {              
                res.status(400).json(
                    {    "status": "false", 
                         "message": err 
                    });
            }
            else 
            {
                console.log(result);
                var value1 = result[0][0].Result;
                console.log(value1);
                switch (value1) {
                    
                    case null: 
                        res.status(400).json(
                            {   "status": "false", 
                                "message": "invalid credentials" 
                            });
                    return;

                    default:
                        var sessionTable = `call insertInSessionTable(?)`;
                        data.query(sessionTable, [mobile_number], (error, res1) => {
                            if (error) 
                            {                               
                                res.status(400).json(
                                    {   "status": "false", 
                                        "message": "session table error:" + error 
                                    });
                            }
                            else 
                            {
                                res.status(200).json(
                                    {   "status": "true", 
                                        "message": "OTP verified successfully!" 
                                    });
                            }
                        })
                    return;
                }
    
            }
    
        })

    }
    else
    {
        res.status(400).json(
            {   "status": "false",
                "message": "enter proper number" 
            })
    }

    
    


})

























module.exports = auth;