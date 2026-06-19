import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { createTradeApi, updateTradeApi } from "../services/tradeApi";
import { deleteTradeApi, type TradeFormData } from "../services/tradeApi";
import { getTradeApi } from "../services/tradeApi";
import { useUser } from "../hooks/useUser";

interface TradeContextType {
  trades: any[];
  setTrades: Dispatch<SetStateAction<any[]>>;
  addTrade: (formData: any) => Promise<void>;
  removeTrade: (idToDel: number) => Promise<void>;
  updateTrade: (idToUpdate: number, formData: any) => Promise<void>;
  loading: boolean;
}

export const TradeContext = createContext<TradeContextType | null>(null);

interface TradeProviderProps {
  children: ReactNode;
}

export default function TradeProvider({ children }: TradeProviderProps) {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        setLoading(true);
        console.log("effect running");
        const { data } = await getTradeApi();
        console.log(data, "from effect");
        setTrades(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!user) return;


    const timer = setTimeout(() => {
      fetchInitialState()
    },1000)

    return () => clearTimeout(timer)
   
  }, [user]);

  const addTrade = async (formData: TradeFormData) => {
    try {
      setLoading(true);
      const { data } = await createTradeApi(formData);
      setTrades((prev) => [data, ...prev]);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log("error from tradeContext", err);
      throw err;
    }
  };

  const removeTrade = async (idToDel: number) => {
    try {
      setLoading(true);

      const response = await deleteTradeApi(idToDel);
      if (response.success) {
        setTrades((prev) => prev.filter((trade) => trade.id !== idToDel));
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      console.log(err);
      throw err;
    }
  };

  const updateTrade = async (idToUpdate: number, formData: any) => {
    try {
      setLoading(true);

      const { data } = await updateTradeApi(idToUpdate, formData);
      setTrades((prev) => prev.map((t) => (t.id === idToUpdate ? data : t)));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <TradeContext.Provider
      value={{ trades, setTrades, addTrade, removeTrade, updateTrade, loading }}
    >
      {children}
    </TradeContext.Provider>
  );
}
