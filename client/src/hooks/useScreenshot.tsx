import { useState } from "react";
import { createScreenshotApi } from "../services/tradeApi";


export default function useScreenshot() {
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const uploadScreenshots = async (
      tradeId: number,
      imageData: FormData
    ) => {
      setLoading(true);
  
      try {
        return await createScreenshotApi(
          tradeId,
          imageData
        );
      } finally {
        setLoading(false);
      }
    };
  setScreenshots([])
    // const fetchScreenshots = async (
    //   tradeId: string
    // ) => {
    //   setLoading(true);
  
    //   try {
    //     const data = await getScreenshotApi(
    //       tradeId
    //     );
  
    //     setScreenshots(data);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    return {
      screenshots,
      loading,
      uploadScreenshots,
    };
  }