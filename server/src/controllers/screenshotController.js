const  { supabase,supabaseAdmin } = require("../config/supabase");


const addScreenshot = async (req, res) => {
    try {
      const tradeId = req.tradeId; 
      const userId = req.user.id;  
      const files = req.files;
  
      if (!files || files.length === 0) {
        return res.status(200).json({
          success: true,
          message: "Trade processed successfully (No screenshots attached)",
          data: []
        });
      } 
  
      const uploadResults = [];
  
      for (const file of files) {
        const fileExtension = file.mimetype.split('/')[1];
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;
        const filePath = `${userId}/${tradeId}/${uniqueFileName}`;
  
        const { data: storageData, error: storageError } = await supabaseAdmin.storage
          .from('trade-screenshots') 
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });
  
        if (storageError) {
          throw new Error(`Storage Error: ${storageError.message}`);
        }
  
        const { data: urlData } = supabaseAdmin.storage
          .from('trade-screenshots')
          .getPublicUrl(filePath);
  
        const publicUrl = urlData.publicUrl;
  
        const { data: dbData, error: dbError } = await supabaseAdmin
          .from('trade_screenshots')
          .insert([
            {
              trade_id: tradeId,
              user_id: userId,
              file_path: storageData.path,     
              file_name: file.originalname,   
              file_size: file.size,
            }
          ])
          .select();
  
        if (dbError) {
          await supabaseAdmin.storage.from('trade-screenshots').remove([filePath]);
          throw new Error(`Database Error: ${dbError.message}`);
        }
  
        const finalResult = {
          ...dbData[0],
          public_url: publicUrl
        };
  
        uploadResults.push(finalResult);
      }
  
      return res.status(201).json({
        success: true,
        message: "Screenshots uploaded and recorded successfully",
        data: uploadResults
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred in the controller"
      });
    }
  };

  const getScreenshot = async (req, res) => {
    const trade_id = req.tradeId;
  
    try {
      const { data, error } = await supabaseAdmin
        .from("trade_screenshots")
        .select("*")
        .eq("trade_id", trade_id);
  
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Failed to get image details",
        });
      }
  
      const screenshots = data.map((screenshot) => {
        const { data: urlData } = supabaseAdmin.storage
          .from("trade-screenshots")
          .getPublicUrl(screenshot.file_path);
  
        return {
          ...screenshot,
          public_url: urlData.publicUrl,
        };
      });
  
      return res.status(200).json({
        success: true,
        message: "Successfully fetched trade screenshots",
        data: screenshots,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  
  module.exports = {
    addScreenshot,
    getScreenshot
  }