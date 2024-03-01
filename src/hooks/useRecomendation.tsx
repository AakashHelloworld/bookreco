import { useQuery } from "@tanstack/react-query";
import {URL} from "@/data/URL"

export const useRecomendation = ({bookname,pagenumber}: {bookname?: string,pagenumber?: number}) => {
    
    
    const fetchApi = async () => {
        const response = await fetch(URL + `books-recommended/${bookname}/${pagenumber ? pagenumber : 1}`)
        const data = await response.json()
        console.log(data)
        return {data: data?.data, count: data?.count}
    }
    return useQuery({
        queryKey: ["popular_Book", pagenumber, bookname],
        queryFn: fetchApi
    })
}