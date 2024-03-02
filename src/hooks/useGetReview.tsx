import { useQuery } from "@tanstack/react-query";
import {URL} from "@/data/URL"

export const useGetReview = ({bookId,userId}: {bookId?: string, userId?: string }) => {
    let token = null as any
   let data= {
        rating: 0, userId: userId
    }
    // if(!userId || !bookId) return data
    const fetchApi = async () => {
        const response = await fetch(URL + `review/${bookId}/${userId}`)
        const data = await response.json()
        return data?.review
    }
    return useQuery({
        queryKey: ["popular_Book", userId, bookId],
        queryFn: fetchApi
    })
}