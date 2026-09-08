import { newsApi } from "../services/newsApi"
import type { newsResponse } from "../types/news.types";
import Navbar from "../component/ui/NavBar";
import { useSidebar } from "../hooks/useSidebar";
import NewsSkeleton from "../component/skeltons/NewsSkelton";
import { useQuery } from "@tanstack/react-query";

interface Res {
  results: newsResponse[];
}

 const getNews = async () => {
    const data: Res = await newsApi();
    const uniqueNews = data.results.filter((n) => !n.duplicate)

    return uniqueNews
  };

export default function News() {

  const { data = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: getNews
  })

  const { toggleSidebar } = useSidebar()


 


  if (isLoading) return <NewsSkeleton />



  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar}>News</Navbar>
      <div className="p-5 flex flex-wrap">
        {data.map((item) => (

          <div className="p-5 w-100 h-100 border-red-100">
            <img src={item.image_url} className="w-80 h-50" />
            <h1 className="p-2 gap-10" key={item.title}>{item.title}</h1>
          </div>

        ))}
      </div>
    </div>
  );
}