# TradeVault

A professional trade journal and trade management platform built for Forex traders. Log, organize, review, and analyze your trades in a structured and clean environment.

This is not a trading platform. This is not a broker. This is a trade journaling tool built to help retail traders track performance, identify patterns, and improve their edge.

---

## Live

- Frontend: https://tradevault.vercel.app
- Backend API: https://tradeapp-43tb.onrender.com

---

## Features

- Multi-account support — manage multiple trading accounts separately
- Trade logging — log every trade with entry, exit, SL, TP, lot size, risk percentage, and notes
- Auto calculation — pips, P&L, RR ratio, and result calculated automatically on the backend
- Dashboard — real-time stats including win rate, net P&L, equity curve, and monthly breakdown
- Trade history — full trade list with search, filter, and sort
- Analytics — performance breakdown by strategy, win/loss streaks, profit factor, and drawdown
- Strategies — create and track custom trading strategies with performance stats
- Calendar view — visual monthly calendar showing profitable and losing trading days
- Screenshots — attach chart screenshots directly to individual trades
- Reports — export trades to CSV or PDF
- Authentication — secure login and register via Supabase Auth

---

## Tech Stack

```
Frontend        React + TypeScript + Tailwind CSS + React Router
Backend         Node.js + Express.js
Database        Supabase PostgreSQL
Auth            Supabase Auth
Charts          Recharts
Frontend Deploy Vercel
Backend Deploy  Render
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/JokkimDoras/tradeapp.git
cd tradeapp
```

Install client dependencies:

```bash
cd client
npm install
```

Create the client environment file. Inside the `client` folder, create a `.env` file and add:

```
VITE_API_URL=https://tradeapp-43tb.onrender.com
```

Start the client:

```bash
npm run dev
```

The app will run at `http://localhost:5173`

The backend is already deployed and running on Render. You do not need to run the server locally. All API calls point to the live backend via the environment variable above.

---

## Project Structure

```
tradevault/
├── client/
│   └── src/
│       ├── component/        UI components
│       ├── context/          React context providers
│       ├── hooks/            Custom hooks
│       ├── lib/              Axios instance and config
│       ├── pages/            Page level components
│       ├── services/         API service functions
│       ├── tests/            Unit and integration tests
│       ├── types/            TypeScript type definitions
│       └── utils/            Helper utilities
│
└── server/
    └── src/
        ├── config/           Supabase client config
        ├── controllers/      Route handler logic
        ├── middleware/       Auth and validation middleware
        ├── routes/           API route definitions
        └── services/         Business logic and calculations
```

---

## Pages

```
/                   Landing page
/login              Login
/register           Register
/account-selector   Account selector
/dashboard          Main dashboard with stats and charts
/history            Full trade history with filters
/analytics          Deep performance analytics
/calendar           Monthly trade calendar
/strategies         Strategy management and performance
/reports            Export trades to CSV or PDF
/profile            User profile and trading preferences
/setting            Account settings
```

---

## API Reference

Base URL: `https://tradeapp-43tb.onrender.com`

### Auth

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
```

### Trades

```
POST   /addtrade
GET    /gettrade
PUT    /updatetrade/:id
DELETE /deletetrade/:id
```

### Accounts

```
GET    /api/accounts
POST   /api/accounts
PUT    /api/accounts/:id
DELETE /api/accounts/:id
```

### Strategies

```
GET    /api/strategies
POST   /api/strategies
PUT    /api/strategies/:id
DELETE /api/strategies/:id
```

---

## Contributing

Contributions are welcome. Here is how to get started.

Fork the repository, then create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

Make your changes and commit using conventional commit messages:

```bash
git commit -m "feat: add your feature description"
```

Push to your fork:

```bash
git push origin feature/your-feature-name
```

Open a pull request against the `main` branch with a clear description of what you changed and why.

### Commit convention

```
feat:       New feature
fix:        Bug fix
refactor:   Code refactor, no feature change
docs:       Documentation only
style:      Formatting, no logic change
chore:      Build process or dependencies
```

---

## Roadmap

- Session tagging (London, New York, Tokyo, Sydney)
- PDF report generation
- Subscription and premium plan
- Mobile app

---

## License

MIT License. See `LICENSE` for details.

---

## Author

Built by the TradeVault team.

> "Without archives, performance is a myth."
