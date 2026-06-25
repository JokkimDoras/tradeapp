import { useEffect, useState } from "react"; // 1. Added useState
import type { AnalyticsDataType } from "../../types/analytics.types";
import { getAnalyticsDataApi } from "../../services/analyticsApi";
import { useLocation } from "react-router";
import useAccount from "../../hooks/useAccount";

interface StatsGridProps {
  totalExecutions: number;
  analyticsData?: AnalyticsDataType | null; 
}

export default function StatsGrid({ totalExecutions }: StatsGridProps) {
  const { selectedAccount } = useAccount();
  const location = useLocation();
  
  const [data, setData] = useState<AnalyticsDataType | null>(null);


  // this is fetch the dashboard stats if the user change the account in the dashboard it will immediately show the result based on the account
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!selectedAccount?.id) return; 

      try {
        console.log('Fetching analytics for account:', selectedAccount.id);
        const response = await getAnalyticsDataApi(selectedAccount.id);
        console.log("THIS IS WHAT THE BACKEND SENT:", response);
        setData(response.data); 
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchAnalytics();
  }, [location.pathname, selectedAccount?.id]); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Total Executions
        </span>
        <span className="text-2xl font-mono font-bold text-white">
          {totalExecutions}
        </span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Active Margin
        </span>
        <span className="text-2xl font-mono font-bold text-white">--</span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Win Rate
        </span>
        <span className="text-2xl font-mono font-bold text-emerald-400">
          {data?.summary?.average_win ?? "--"}
        </span>
      </div>
      <div className="p-5 rounded-lg border border-zinc-900 bg-zinc-950 flex flex-col gap-2 shadow-sm">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Net Return
        </span>
        <span className="text-2xl font-mono font-bold text-white">
          {data?.summary?.profit_factor ?? "--"}
        </span>
      </div>
    </div>
  );
}