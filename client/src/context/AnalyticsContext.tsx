import { createContext, useState } from "react";
import { getAnalyticsDataApi } from "../services/analyticsApi";
import type {
  AnalyticsDataType,
  AnalyticsContextType,
} from "../types/analytics.types";

export const AnalyticsContext = createContext<AnalyticsContextType | null>(
  null
);


export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDataType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOld, setIsOld] = useState(true);

  const getAnalyticsData = async (force = false) => {
    try {
      setLoading(true);
      if (!analyticsData || isOld || force) {
        const { data } = await getAnalyticsDataApi();
        setAnalyticsData(data);
        setIsOld(false);
      }
    } catch (err: any) {
      setError(err?.message || "Error from AnalyticsContext");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const refreshAnalyticsData = async () => {
    try {
      setLoading(true);
      const { data } = await getAnalyticsDataApi();
      setAnalyticsData(data);
      setIsOld(false); // Reset the stale flag to false since it's now fresh
    } catch (err: any) {
      setError(err?.message || "Error refreshing AnalyticsContext");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        analyticsData,
        loading,
        error,
        getAnalyticsData,
        refreshAnalyticsData,
        setIsOld,
        isOld,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
