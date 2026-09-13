const { supabaseAdmin } = require("../config/supabase");

const deleteUserController = async(req,res) => {
  const user_id = req.user.id;
  try{
  const { data,error} = await supabaseAdmin.auth.admin.deleteUser(user_id);
  if(error || !data){
    return res.status(500).json({
        success:false,
        message:'Internal server error',
        error
    })
  }
  return res.status(200).json({
    success:true,
    message:'User Account Delete Successfully',
    data
  })
  }catch(err){
      return res.status(500).json({
        success:false,
        message:'Internal server error',
        err
      })
  }
}

module.exports = { deleteUserController }