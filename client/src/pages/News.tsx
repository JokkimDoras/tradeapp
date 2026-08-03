import { useEffect, useState } from "react"
import { newsApi } from "../services/newsApi"
import type { newsResponse } from "../types/news.types";


interface Res {
    results: newsResponse[];
  }
  
  export default function News() {
    const [news, setNews] = useState<newsResponse[]>([]);
  
    useEffect(() => {
      const getNews = async () => {
        const data: Res = await newsApi();
        setNews(data.results);
      };
  
      getNews();
    }, []);
  
    return (
      <div className="p-5 flex flex-wrap">
        {news.map((item) => (

            <div className="p-5 w-100 h-100 border-red-100">
          <img src={item.image_url} className="w-80 h-50"/>
          <h1 className="p-2 gap-10" key={item.title}>{item.title}</h1>
            </div>

        ))}
      </div>
    );
  }