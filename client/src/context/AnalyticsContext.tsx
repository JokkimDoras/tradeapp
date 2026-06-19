import { createContext, useState } from "react";
import { getAnalyticsDataApi } from "../services/analyticsApi";
interface Summary {
  total_trades: number;
  closed_trades_count: number;
  open_trades: number;
  net_profit_loss: number;
  overall_wins: number;
  overall_losses: number;
  profit_factor: string;
  win_rate: string;
  average_win: string;
  average_loss: string;
  best_trade: number;
  worst_trade: number;
  max_drawdown: number;
  max_win_streak: number;
  max_loss_streak: number;
}

interface ChartData {
  date: string;
  daily_pnl: number;
  equity_curve: number;
}

interface AnalyticsDataType {
  summary: Summary;
  chart_data: ChartData[];
}

interface AnalyticsContextType {
  analyticsData: AnalyticsDataType | null;
  loading: boolean;
  error: string | null;
  getAnalyticsData: () => Promise<void>;
}

export const AnalyticsContext = createContext<AnalyticsContextType | null>(
  null
);

export default function AnalyticsProvider({ children }:{ children: React.ReactNode }) {
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
