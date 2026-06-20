export interface formProfileDetails{
  fullname:string;
  country:string;
  bio:string;
}

export interface User {
  full_name: string;
  email: string;
  country: string;
  bio: string;
  account_currency: string;
  default_lot_size: number;
  risk_per_trade: number;
  trading_experience: string;
  timezone:string;
}

export interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
