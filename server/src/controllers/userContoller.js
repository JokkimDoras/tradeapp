const { supabase } = require("../config/supabase");

const getUser = async(req,res) => {
 const user_id = req.user_id;

 try{
   const {data,error} = await supabase
   .from('users')
   .select('*')
   .eq('id',user_id)
   .single()
if(error || !data) {
  return res.status(400).json({
    success:false,
    message:'Failed to Get User Info',
    error
  })
}

return res.status(200).json({
  success:true,
  message:'Get the user info succesfully',
  data
})
 }catch(err){
  console.log('err from useConroller geTUser',err)
  return res.status(400).json({
    success:false,
    message:'Faile to get User Info',
    err
  })

 }

}

const updateUser = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(req.body)
      .eq("id", req.user.id)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data,
    });
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  updateUser,
  getUser
};