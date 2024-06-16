
const express=require('express');
const router=express.Router();



const credential={
    email:'Sahlathasnim@gmail.com',
    password:'DesignerMe@1'
}

// login user
router.post('/login',(req,res)=>{
    if(!req.session.user){
        if(req.body.email==credential.email && req.body.password==credential.password){
            req.session.user=req.body.email;
            res.redirect('/route/dashboard')
            // res.end('login successful...!');
        }else{
            res.redirect('/')
        }


    }else{
        res.redirect('/')
    }
   
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
      res.render('dashboard',{user:req.session.user})  
    }else{
        
      res.render('base')
    }
})

// route for logout
router.get('/logout',(req,res)=>{
    
        req.session.user=null
        res.redirect('/route/logoutpage')

          
})

router.get('/logoutpage',(req,res)=>{
    if(req.session.user){
        res.redirect('/')
    }else{
        
        const logout="logout successfully"
        res.render('base',{logout})
    }
    
})

module.exports=router;