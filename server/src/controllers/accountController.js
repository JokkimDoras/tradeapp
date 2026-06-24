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

const deleteAccount = async(req,res) => {

    const accountID = req.params.id;

    try{
        const { data,error } = await supabaseAdmin
        .from('accounts')
        .delete()
        .eq('id',accountID)

        if(error) {
            return res.status(400).json({
                success:false,
                message:'Could not delete account',
                error
            })
        }

        return res.status(200).json({
            success:true,
            message:'Account successfully delete',
            data

        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
          });
    }
}

const getAccount = async(req,res) => {
       const user_id = req.user.id

       try{
       const {data,error } = await supabaseAdmin
        .from('accounts')
        .select('*')
        .eq('user_id',user_id)
        .order("created_at",{ascending:true})

        if (error) {
            return res.status(400).json({
              success: false,
              message: "Failed to fetch accounts",
              error
            });
          }

          return res.status(200).json({
            success: true,
            message: "Accounts fetched successfully",
            data
          });

       }catch(err){
        return res.status(400).json({
            success: false,
            message: "Failed to fetch accounts",
            err
          });
       }

}

module.exports = {createAccount,deleteAccount,getAccount}