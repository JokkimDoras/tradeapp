import { useState } from "react";
import {
  createScreenshotApi,
  deleteScreenshotApi,
  getScreenshotApi,
} from "../services/screenshotApi";
import type {
  fetchScreenshotResponse,
  responseScreenshotData,
} from "../types/screenshot.types";

export default function useScreenshot() {
  const [loading, setLoading] = useState(false);

  const uploadScreenshots = async (tradeId: number, imageData: FormData) => {
    setLoading(true);

    try {
      return await createScreenshotApi(tradeId, imageData);
    } finally {
      setLoading(false);
    }
  };
  const fetchScreenshots = async (tradeId: string) => {
    try {
      const data: fetchScreenshotResponse = await getScreenshotApi(tradeId);

      return data.data;
    } catch (err: any) {
      console.error(err?.message || "Failed in useScreenshot");
      throw err;
    }
  };

  const deleteScreenshot = async (delDetails: responseScreenshotData) => {
    try {
     const res = await deleteScreenshotApi(delDetails);
     return res;
    } catch (err: any) {
      console.error(err?.message || err);
    }
  };

  return {
    loading,
    uploadScreenshots,
    fetchScreenshots,
    deleteScreenshot,
  };
}
