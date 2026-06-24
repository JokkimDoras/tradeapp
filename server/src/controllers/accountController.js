const { supabaseAdmin } = require('../config/supabase');

const createAccount = async(req,res) => {

    const { name, broker, account_type, currency, starting_balance } = req.body;
    const user_id = req.user.id;

    try{
     const { data , error } = await supabaseAdmin
     .from('accounts')
     .insert([{
        user_id:user_id,
        name,
        broker,
        account_type,
        currency,
        starting_balance
     }])
     .select()
     .single()

     if(error || !data) {
        return res.status(400).json({
            success:false,
            message:'Faild to add the account',
            error:error
        })
     }

     return res.status(200).json({
        success:true,
        message:'Successfully create a new Account',
        data
     })
    }catch(err){

        return res.status(500).json({
            success:false,
            message:'Failed to add new account',
            error:err
        })

    }


    

}

const deleteAccount = (req,res) => {

}

module.exports = {createAccount,deleteAccount}