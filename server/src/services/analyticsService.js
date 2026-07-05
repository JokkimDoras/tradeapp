const calculatePerformanceMetrics = (trades = []) => {
  const total_trades = trades.length;

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
        best_trade: 0,       
        worst_trade: 0,      
        max_drawdown: 0,
        max_win_streak: 0,
        max_loss_streak: 0
      },
      chart_data: [] 
    };
  }

  let net_profit_loss = 0;
  let overall_wins = 0;
  let overall_losses = 0; 
  let gross_profit = 0;
  let gross_loss = 0;
  
  let best_trade = -Infinity;
  let worst_trade = Infinity;

  // loop through closed trades to populate metrics
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

    if (pnl > best_trade) {
      best_trade = pnl;
    }
    if (pnl < worst_trade) {
      worst_trade = pnl;
    }
  });

  if (best_trade === -Infinity) best_trade = 0;
  if (worst_trade === Infinity) worst_trade = 0;

  let profit_factor = "0.00";
  if (gross_loss === 0) {
    profit_factor = gross_profit > 0 ? "Undefeated" : "0.00";
  } else {
    profit_factor = (gross_profit / gross_loss).toFixed(2);
  }

  const win_rate = ((overall_wins / closed_trades.length) * 100).toFixed(1);

  const average_win = overall_wins > 0 
    ? (gross_profit / overall_wins).toFixed(2) 
    : "0.00";

  const average_loss = overall_losses > 0 
    ? (gross_loss / overall_losses).toFixed(2) 
    : "0.00";

  const sanitizedTrades = closed_trades.map(trade => {
    const rawDate = trade.close_date || trade.trade_date || trade.updatedAt || trade.created_at;
    let parsed = new Date(rawDate);
    if (isNaN(parsed.getTime())) parsed = new Date();
    
    return {
      ...trade,
      cleanTimestamp: parsed.getTime(),
      cleanDateObject: parsed
    };
  });

  const sortedTrades = sanitizedTrades.sort((a, b) => a.cleanTimestamp - b.cleanTimestamp);

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

    if (runningBalance > peakBalance) {
      peakBalance = runningBalance;
    }

    const currentDrawdown = peakBalance - runningBalance;
    if (currentDrawdown > maxDrawdown) {
      maxDrawdown = currentDrawdown;
    }

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

  // 9. Return perfectly formatted datasets including new metrics
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
      best_trade: Math.round(best_trade * 100) / 100,    // Appended here
      worst_trade: Math.round(worst_trade * 100) / 100,  // Appended here
      max_drawdown: Math.round(maxDrawdown * 100) / 100,
      max_win_streak: maxWinStreak,
      max_loss_streak: maxLossStreak,
      
    },
    chart_data 
  };
};

const calculateTradeMetrics = (tradeData) => {
  const entry = parseFloat(tradeData.entry_price || 0);
  const exit = parseFloat(tradeData.exit_price || 0);
  const sl = parseFloat(tradeData.stop_loss || 0);
  const tp = parseFloat(tradeData.take_profit || 0);
  const lots = parseFloat(tradeData.lot_size || 0);
  const isBuy = tradeData.trade_type?.toLowerCase() === "buy";
  const isClosed = tradeData.status?.toLowerCase() === "closed";

  let pips = 0;
  let profit_loss = 0;
  let risk_reward_ratio = 0;

  // 1. Calculate Pips movement (Assumes standard 4-decimal currency formatting rules)
  if (isClosed && entry > 0 && exit > 0) {
    pips = isBuy ? (exit - entry) * 10000 : (entry - exit) * 10000;
  }

  // 2. Calculate Profit Loss if position is completed
  if (isClosed && entry > 0 && exit > 0) {
    // Basic standard calculation model (1 Lot = $10 per pip)
    profit_loss = pips * lots * 10;
  }

  // 3. Calculate Risk to Reward ratio
  const riskDistance = Math.abs(entry - sl);
  const rewardDistance = Math.abs(tp - entry);
  if (riskDistance > 0) {
    risk_reward_ratio = rewardDistance / riskDistance;
  }

  return {
    pips: Math.round(pips * 10) / 10,
    profit_loss: Math.round(profit_loss * 100) / 100,
    risk_reward_ratio: Math.round(risk_reward_ratio * 100) / 100,
    result: isClosed      
      ? profit_loss > 0
        ? "win"
        : profit_loss < 0
        ? "loss"
        : "breakeven"
      : null
  };
};

module.exports = {
  calculatePerformanceMetrics,
  calculateTradeMetrics
};