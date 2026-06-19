const calculatePerformanceMetrics = (trades = []) => {
    const total_trades = trades.length;
  
    // Filter only closed positions for performance metrics
    const closed_trades = trades.filter(
      (trade) => trade.status?.toLowerCase() === "closed"
    );
  
    const open_trades = total_trades - closed_trades.length;
  
    // Zero-State Safeguard
    if (closed_trades.length === 0) {
      return {
        summary: {
          total_trades,
          closed_trades_count: 0,
          open_trades,
          net_profit_loss: 0,
          overall_wins: 0,
          overall_losses: 0,
          profit_factor: "0.00",
          win_rate: "0.0",
          average_win: "0.00",
          average_loss: "0.00",
          max_drawdown: 0,
          max_win_streak: 0,
          max_loss_streak: 0
        },
        chart_data: [] 
      };
    }
  
    // 1. Initialize core metric trackers
    let net_profit_loss = 0;
    let overall_wins = 0;
    let overall_losses = 0; 
    let gross_profit = 0;
    let gross_loss = 0;
  
    // 2. Loop through closed trades to populate gross metric buckets
    closed_trades.forEach((trade) => {
      const pnl = Number(trade.profit_loss || 0);
      net_profit_loss += pnl;
  
      if (pnl > 0) {
        overall_wins++;
        gross_profit += pnl;
      } else if (pnl < 0) {
        overall_losses++;
        gross_loss += Math.abs(pnl);
      }
    });
  
    // 3. Calculate Profit Factor
    let profit_factor = "0.00";
    if (gross_loss === 0) {
      profit_factor = gross_profit > 0 ? "Undefeated" : "0.00";
    } else {
      profit_factor = (gross_profit / gross_loss).toFixed(2);
    }
  
    // 4. Calculate Win Rate percentage
    const win_rate = ((overall_wins / closed_trades.length) * 100).toFixed(1);
  
    // 5. Calculate Average Win and Average Loss amounts
    const average_win = overall_wins > 0 
      ? (gross_profit / overall_wins).toFixed(2) 
      : "0.00";
  
    const average_loss = overall_losses > 0 
      ? (gross_loss / overall_losses).toFixed(2) 
      : "0.00";
  
    // FIXED: Pre-sanitize dates into reliable timestamp integers to prevent sorting and ISO crashes
    const sanitizedTrades = closed_trades.map(trade => {
      const rawDate = trade.close_date || trade.trade_date || trade.updatedAt || trade.created_at;
      let parsed = new Date(rawDate);
      
      if (isNaN(parsed.getTime())) {
        parsed = new Date(); // Fallback to current time if database holds garbage values
      }
      
      return {
        ...trade,
        cleanTimestamp: parsed.getTime(),
        cleanDateObject: parsed
      };
    });
  
    // 6. Sort safely using our clean timestamps
    const sortedTrades = sanitizedTrades.sort((a, b) => a.cleanTimestamp - b.cleanTimestamp);
  
    // 7. Initialize chronological trackers
    const dailyDataMap = {};
    let runningBalance = 0;
    let peakBalance = 0;     
    let maxDrawdown = 0;     
  
    let currentWinStreak = 0;
    let maxWinStreak = 0;
    let currentLossStreak = 0;
    let maxLossStreak = 0;
  
    // 8. Single unified timeline traversal loop
    sortedTrades.forEach((trade) => {
      // Safely output standard YYYY-MM-DD from our guaranteed date object
      const dateStr = trade.cleanDateObject.toISOString().split('T')[0];
      const pnl = Number(trade.profit_loss || 0);
  
      if (!dailyDataMap[dateStr]) {
        dailyDataMap[dateStr] = {
          date: dateStr,
          daily_pnl: 0,
          equity_curve: 0
        };
      }
  
      runningBalance += pnl;
      dailyDataMap[dateStr].daily_pnl += pnl;
      dailyDataMap[dateStr].equity_curve = Math.round(runningBalance * 100) / 100;
  
      // --- Max Drawdown Sub-Calculation ---
      if (runningBalance > peakBalance) {
        peakBalance = runningBalance;
      }
  
      const currentDrawdown = peakBalance - runningBalance;
  
      if (currentDrawdown > maxDrawdown) {
        maxDrawdown = currentDrawdown;
      }
  
      // --- Streak Tracking Sub-Calculation ---
      if (pnl > 0) {
        currentWinStreak++;
        currentLossStreak = 0; 
        if (currentWinStreak > maxWinStreak) {
          maxWinStreak = currentWinStreak;
        }
      } else if (pnl < 0) {
        currentLossStreak++;
        currentWinStreak = 0; 
        if (currentLossStreak > maxLossStreak) {
          maxLossStreak = currentLossStreak;
        }
      }
    });
  
    const chart_data = Object.values(dailyDataMap).map(day => ({
      ...day,
      daily_pnl: Math.round(day.daily_pnl * 100) / 100
    }));
  
    // 9. Return perfectly formatted datasets
    return {
      summary: {
        total_trades,
        closed_trades_count: closed_trades.length,
        open_trades,
        net_profit_loss: Math.round(net_profit_loss * 100) / 100,
        overall_wins,
        overall_losses,
        profit_factor,
        win_rate,
        average_win,
        average_loss,
        max_drawdown: Math.round(maxDrawdown * 100) / 100,
        max_win_streak: maxWinStreak,
        max_loss_streak: maxLossStreak
      },
      chart_data 
    };
  };
  
  module.exports = {
    calculatePerformanceMetrics,
  };