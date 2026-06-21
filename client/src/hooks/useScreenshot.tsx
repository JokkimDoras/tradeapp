import { useState } from "react";
import { createScreenshotApi,getScreenshotApi } from "../services/screenshotApi";
import type { fetchScreenshotResponse } from "../types/screenshot.types";


export default function useScreenshot() {
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
    const fetchScreenshots = async (
      tradeId: string
    ) => {
  
      try {
        const data:fetchScreenshotResponse = await getScreenshotApi(
          tradeId
        );
  
        return data.data
      } catch(err:any) {
        console.error(err?.message || 'Failed in useScreenshot')
        throw err
      }
    };
  
    return {
      loading,
      uploadScreenshots,
      fetchScreenshots
    };
  }