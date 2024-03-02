import { useQuery } from "@tanstack/react-query";
import {URL} from "@/data/URL"


export const useGetMe = () => {
    let token = null as any;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = localStorage.getItem('token')
      }
    if (!token) return {data: null}

    const fetchApi =  async() => {
        const response = await fetch(URL + `get-user`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        return data
    }
    return useQuery({
        queryKey: ["me"],
        queryFn: fetchApi
    })
}