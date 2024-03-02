import { useQuery } from "@tanstack/react-query";
import {URL} from "@/data/URL"


export const useGetMyReview = (userId?: string) => {
    console.log(userId)
    const fetchApi =  async() => {
        const response = await fetch(URL + `reviews/${userId}`)
        const data = await response.json()
        return data
    }
    return useQuery({
        queryKey: ["myReview", userId],
        queryFn: fetchApi
    })
}