import { useEffect, useState } from "react"
import { newsApi } from "../services/newsApi"

export default function News() {
  const [ news,setNews ] = useState(null)
  useEffect(() => {
    const getNews = async () => {
      const data = await newsApi();
      setNews(data);
    };
  
    getNews();
  }, []);
  console.log(news)
    return <div>
        News
        </div>
}