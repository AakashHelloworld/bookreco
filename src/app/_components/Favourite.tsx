"use client"
import React from "react"
import { usePopular } from "@/hooks/usePopular"
import '@smastrom/react-rating/style.css'
import { useGlobalContext } from "@/provider/state-manager";  
import HoverCardContainer from "@/components/shared/HoverCardContainer"


interface Context {
    state?: {
        username: string;
        id: string;
        }
    dispatch?: (value: { type: "SET_COMPLETED" , payload: boolean}) => void    
  }
export default function Favourite() {
    const { state  }: Context = useGlobalContext()
      const {data:populars, isLoading:popularLoading} = usePopular({pagenumber: 1, page_size: 50})

      

    const books = [
        {
            name: "Harry Potter",
            author: "Author 1",
            image: "https://m.media-amazon.com/images/I/71sH3vxziLL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "Flowers for Algernon",
            author: "Author 2",
            image: "https://m.media-amazon.com/images/I/61nP-IYQd2L._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        },
        {
            name: "Monk who sold his Ferrari",
            author: "Author 3",
            image: "https://static-01.daraz.com.np/p/33b37db4172a2544cff2bc88d011aba6.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "How to think like a roman empire",
            author: "Author 4",
            image: "https://m.media-amazon.com/images/I/7173Hedc4ZL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "Can't Hurt Me",
            author: "Author 5",
            image: "https://m.media-amazon.com/images/I/81gTRv2HXrL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "Can't Hurt Me",
            author: "Author 5",
            image: "https://m.media-amazon.com/images/I/81gTRv2HXrL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "How to think like a roman empire",
            author: "Author 4",
            image: "https://m.media-amazon.com/images/I/7173Hedc4ZL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "Flowers for Algernon",
            author: "Author 2",
            image: "https://m.media-amazon.com/images/I/61nP-IYQd2L._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

        },
        {
            name: "Harry Potter",
            author: "Author 1",
            image: "https://m.media-amazon.com/images/I/71sH3vxziLL._AC_UF1000,1000_QL80_.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: "Monk who sold his Ferrari",
            author: "Author 3",
            image: "https://static-01.daraz.com.np/p/33b37db4172a2544cff2bc88d011aba6.jpg",
            description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum   dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
    ]
    return (
        <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-3xl">Welcome</h1>
          <p className="opacity-70 text-sm mb-4 capitalize">
            {state?.username}
          </p>
        </div>

        <div>
          <h1 className="font-semibold text-xl text-[#232e7f]">Select some favorite books</h1>
        </div>

        <div className="flex flex-wrap gap-14 w-full justify-center border border-slate-200 rounded-lg p-4 h-[450px] overflow-y-scroll">
            {
          populars?.data?.length &&  populars?.data?.map((book : any) => (
            <HoverCardContainer book={book}/>

                ))


            }


        </div>
        </div>
    )
}