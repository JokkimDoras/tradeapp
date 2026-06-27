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
  const [analyticsData, setAnalyticsData] = useState<AnalyticsDataType | null >(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOld, setIsOld] = useState(true);
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);

  const getAnalyticsData = async (force: boolean | undefined = false,accountId:string) => {
    if (!accountId || accountId === "undefined") return;
    try {
      setLoading(true);

      const isDifferentAccount = accountId !== currentAccountId;

      if (isDifferentAccount) {
        setAnalyticsData(null);
      }

      if (!analyticsData || isOld || force || isDifferentAccount) {
        const { data } = await getAnalyticsDataApi(accountId);
        setAnalyticsData(data);
        setCurrentAccountId(accountId);
        setIsOld(false);
        return data 
      }
    } catch (err: any) {
      setError(err?.message || "Error from AnalyticsContext");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalyticsData = async (accountId:string) => {
    try {
      setLoading(true);
      const { data } = await getAnalyticsDataApi(accountId);
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
