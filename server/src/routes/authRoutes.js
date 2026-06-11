const supabase = require('../config/supabase');

const router = require('express').Router();

router.post('/register', async(req, res) => {
    const { email, password,full_name } = req.body;

    if(!email || !password){
        res.status(400).json({
            message:'Expected a email and password'
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters'
        });
      }

      const { data,error} = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm:false,
        user_metadata:{full_name}
      })
    
      if(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
      }

    res.status(201).json({
        success:true,
        message:'Account created, please verify your email',
        data:{
            id:data.user.id,
            email:data.user.email,
            full_name
        }

    })
})

module.exports = router;