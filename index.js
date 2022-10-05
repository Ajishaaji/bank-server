//import express
const express=require('express')
//import data Service
const dataService=require('./services/data.service')
//jsonwebtoken import
const jwt= require('jsonwebtoken')
//import cors
const cors = require('cors')


const req = require('express/lib/request');
const res = require('express/lib/response');

//using express create server app
const app=express()

//use cors to specify origin
app.use(cors({
    origin:'http://localhost:4200'
}))

//to parse json data
app.use(express.json())

//http
//get - to read data from server
app.get('/',(req,res)=>{
    res.send('GET METHOD')
})

//post-server create
app.post('/',(req,res)=>{
    res.send('POST METHOD')
})

//put-modify
app.put('/',(req,res)=>{
    res.send('PUT METHOD')
})

//patch-partially modify
app.patch('/',(req,res)=>{
    res.send('PATCH METHOD')
})

//delete-delete
app.delete('/',(req,res)=>{
    res.send('DELETE METHOD')
})

//Application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log('inside application middleware');
    next()
}
//app.use(appMiddleware)

//router specific middleware
const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt middleware');

    //to fetch token 
    const token=req.headers['x-access-token']
    //verify token - verify()
   try{const data= jwt.verify(token,'supersecretkey12345')
   console.log(data);
   next()
}
   catch{
    res.status(404).json({
        
        status:true,
        message:'please log in'
    })
   }
}

//http response status
//1xx - information
//2xx - success
//3xx - redirection
//4xx - client error
//5xx - server error
//bank app

//register API
app.post('/register',(req,res)=>{
    console.log(req.body);
 //asynchronous
    dataService.register(req.body.username,req.body.acno,req.body.password)
 .then(result=>{
    res.status(result.statusCode).json(result)

 })
})

//login API
app.post('/login',(req,res)=>{
    console.log(req.body);
    //asynchronous
  dataService.login(req.body.acno,req.body.pswd)
  .then(result=>{
    res.status(result.statusCode).json(result)
})
})

//deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
 .then(result=>{
    res.status(result.statusCode).json(result)
})
})

//withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    //asynchronus
  dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
  .then(result=>{
    res.status(result.statusCode).json(result)
})
})

//transaction API
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 dataService.getTransaction(req.body.acno)
 .then(result=>{
    res.status(result.statusCode).json(result)
})
})
 
//delete API
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAccount(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//set port number 
app.listen(3000,()=>{
    console.log('server started at 3000');
})