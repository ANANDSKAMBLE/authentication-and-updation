const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyparser=require("body-parser");
const nodemailer=require("nodemailer");

const data=require('C:/Users/Anand S Kamble/Desktop/html/connectionFiles/database.js');

const mail=require('C:/Users/Anand S Kamble/Desktop/html/connectionFiles/mailsender.js')




app.use(express.json());


app.post('/updatename',(req,res)=>{
    const {UUID,firstname,lastname}=req.body;
	
//check valid UUID
    if(UUID.length>=4 && UUID.length<=10)
    {
        var changename=`call updateName(?,?,?)`;

        data.query(changename,[UUID,firstname,lastname],(err,resultSet)=>{
            if(err)
            {
                console.log(err);
                res.status(400).json(
                    {   "status":"false",
                        "message":"error occured "+err
                    });
            }
            else
            {
                console.log(resultSet);
                var value3=resultSet[0][0].Result;
                switch(value3)
                {
                    case 'Not Updated':
                        res.status(400).json(
                            {   "status":"false",
                                "message":"update failed"
                            });
                    return;
                    case "Updated":
                        res.status(200).json(
                            {   "status":"true",
                                "message":"data updated successfully!"
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
                "message": "enter proper UUID" 
            })

    }



    
    

})






app.post('/updateDOB',(req,res)=>{
    const {UUID,DOB}=req.body;
	//validating data
    if(UUID.length>=4 && UUID.length<=10 && /^\d{4}-\d{2}-\d{2}$/.test(DOB))
    {

        var changeDOB=`call updateDOB(?,?)`;
        data.query(changeDOB,[UUID,DOB],(err,result)=>{
            if(err)
            {   
                res.status(400).json(
                    {   "status":"false",
                        "message":"error occured: "+err
                    });
            }
            else
            {
                console.log(result);
                var value4=result[0][0].Result;
                switch(value4)
                {
                    case 'Not Updated':
                            res.status(400).json(
                                {   "status":"false",
                                    "message":"DateOfBirth update failed"
                                });
                    return;
                    case "Updated":
                        res.status(200).json(
                            {   "status":"true",
                                "message":"DateOfBirth updated successfully!"
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
                "message": "enter proper input(s)" 
            })
    }
   
})






module.exports=app;