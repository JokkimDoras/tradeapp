const { supabaseAdmin } = require('../config/supabase');

const addTrade =async (req,res) => {

    const userId = req.userId
    const dbPayload = {
        user_id:userId,
        ...req.body
    }

    try{
        const { data,error} = await supabaseAdmin
        .from('trades')
        .insert([dbPayload])
        .select()

        if(error){
            return res.status(400).json({
                success:false,
                message:'DataBase insert failed',
                error
            })
        }

        return res.status(200).json({
            success:true,
            message:'successfully added new trade',
            data:data[0]
        })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:'Internal server Error'
        })

    }


}

module.exports = {addTrade}