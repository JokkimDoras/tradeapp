require("dotenv").config();

const newsController = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_API_KEY}&q=trading&language=en`
    );

    const data = await response.json();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = { newsController };