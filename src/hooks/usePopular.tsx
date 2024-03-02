import { useQuery } from "@tanstack/react-query";
import {URL} from "@/data/URL"

export const usePopular = ({pagenumber, page_size}: {pagenumber?: number, page_size?: number}) => {
    
    
    const fetchApi = async () => {
        const response = await fetch(URL + `popular/${pagenumber ? pagenumber : 1}/${page_size ? page_size : 10}`)
        const data = await response.json()
        console.log(data)
        return {data: data?.data, count: data?.count}
    }
    return useQuery({
        queryKey: ["popular_Book", pagenumber, page_size],
        queryFn: fetchApi
    })
}


// export const usePopular = async({pageSize}: {pageSize?: number}) => {
//   const response = await fetch(URL + `popular/${pageSize ? pageSize : 1}`)
//   const data = await response.json()
//   return data
// } 