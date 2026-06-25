
export interface Summary {
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
  
  export interface ChartData {
    date: string;
    daily_pnl: number;
    equity_curve: number;
  }
  
  export interface AnalyticsDataType {
    summary: Summary;
    chart_data: ChartData[];
  }
  
  export interface AnalyticsContextType {
    analyticsData: AnalyticsDataType | null;
    loading: boolean;
    error: string | null;
    getAnalyticsData: (some?:boolean) => Promise<void>;
    refreshAnalyticsData:() => Promise<void>;
    isOld:boolean;
    setIsOld: React.Dispatch<React.SetStateAction<boolean>>; 
  }

  // export interface AnalyticsContextType {
  //   analyticsData: any ;
  //   loading: any;
  //   error: any ;
  //   getAnalyticsData: (some?:any) => any;
  //   refreshAnalyticsData:any;
  //   isOld:any;
  //   setIsOld: any; 
  // }