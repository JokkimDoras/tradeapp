export interface TradeDetails {
     id: any;
     currency_pair: any;
     trade_type: any;
     status: any;
     entry_price: string;
     exit_price: string;
     stop_loss: string;
     take_profit: string;
     lot_size: string;
     risk_percentage: string;
     notes: string;
     strategy: string;
     account_id:number | undefined | string
}