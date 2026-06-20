import { createContext, useState } from "react";
import { getAnalyticsDataApi } from "../services/analyticsApi";
import type { AnalyticsDataType,AnalyticsContextType } from "../types/analytics.types";

export const AnalyticsContext = createContext<AnalyticsContextType | null>(
  null
);

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDataType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAnalyticsData = async () => {
    try {
      setLoading(true);
      if (!analyticsData) {
        const { data } = await getAnalyticsDataApi();
        setAnalyticsData(data);
      }
    } catch (err: any) {
      setError(err?.message || "Error from AnalyticsContext");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{ analyticsData, loading, error, getAnalyticsData }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}