const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const router=require('./router');
const nocache=require('nocache');
const app=express();
const flash=require('express-flash')
const port=process.env.PORT||8080;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(nocache());
app.set('view engine','ejs');

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

app.use('/route',router);


//home route
app.get('/',(req,res)=>{
    if(req.session.user){
        
        res.render('dashboard',{user:req.session.user})
    }else{
         
      
        res.render('base',{title:'login System',});
    }
})


app.listen(port,()=>(console.log('Listening to the server on http://localhost:8080')));