import { useState } from "react";
import { userDetailsUpdate } from "../services/userApi";

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSettings = async (formProfile: any) => {
    try {
      setLoading(true);
      const data = await userDetailsUpdate(formProfile);
      return data;
    } catch (err: any) {
      setLoading(false);
      setError(err);
      console.log("From useProfile:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const defaultSetting = async (default_setting: any) => {
    try {
      await userDetailsUpdate(default_setting);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };
  return {
    updateSettings,
    loading,
    error,
    defaultSetting,
  };
}
