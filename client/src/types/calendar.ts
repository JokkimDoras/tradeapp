export interface TradeLog {
    id: string;
    pair: string;
    type: 'Buy' | 'Sell';
    pips: number;
    pnl: number;
  }
  
  export interface DaySummary {
    tradeCount: number;
    netPnL: number;
    status: 'profitable' | 'unprofitable' | 'breakeven';
    winRate?: number;
    totalPips?: number;
    trades?: TradeLog[];
  }
  
  export type MonthData = Record<string, DaySummary>;