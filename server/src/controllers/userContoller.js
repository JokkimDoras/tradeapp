const { supabase } = require("../config/supabase");

const sayHello = (req, res) => {
  res.status(200).json({ message: "from frustration" });
};

const updateUser = async (req, res) => {
  try {
    const { fullname, bio, country } = req.body;

    console.log("User ID:", req.user.id);

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name:fullname,
        bio,
        country,
      })
      .eq("id", req.user.id)
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  sayHello,
  updateUser,
};