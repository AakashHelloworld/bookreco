"use client"
// import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Rating , Heart} from '@smastrom/react-rating'
import React, { useState, useEffect } from "react"
import { usePopular } from "@/hooks/usePopular"
import '@smastrom/react-rating/style.css'

export default function Favourite() {
    const [rating, setRating] = React.useState(0)
    const myStyles = {
        itemShapes: Heart,
        activeFillColor: '#ff41b4',
        inactiveFillColor: '#ffd7ef'
      }

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
          <p className="opacity-70 text-sm mb-4">Aakash Bandhu Aryal</p>
        </div>

        <div>
          <h1 className="font-semibold text-xl text-[#232e7f]">Select some favorite books</h1>
        </div>

        <div className="flex flex-wrap gap-14 w-full justify-center border border-slate-200 rounded-lg p-4 h-[450px] overflow-y-scroll">
            {
          populars?.data?.length &&  populars?.data?.map((book : any) => (
                    <HoverCard>
                    <HoverCardTrigger>
                        <Card
                            className="h-[300px] w-[200px] cursor-pointer overflow-hidden "
                            key={book?.Book_Title}>
                            <div className="h-[80%] w-full overflow-hidden">
                            <img className="h-full w-full object-cover" src={book?.Image_URL_M} alt={book.name} />
                            </div>
                            <h1 title={book.name} className="font-semibold text-sm m-2"> <span className="opacity-70 text-sm">Name: </span>{ book?.Book_Title.length > 15  ? book?.Book_Title?.slice(0, 15) + "..." : book?.Book_Title}</h1>
                            <p title={book.author} className="font-semibold text-sm m-2"><span className="opacity-70 text-sm">Author: </span>{ book?.Book_Author?.length > 15  ? book?.Book_Author?.slice(0, 15) + "..." : book?.Book_Author}</p>
                           
                        </Card>
                    </HoverCardTrigger>

                        <HoverCardContent className="h-[300px] w-[300px] flex flex-col justify-between" align="start" side="right">
                            <p><span className="text-sm font-semibold" >Description: </span>{book?.Book_Title?.length > 100  ? book?.Book_Title?.slice(0, 200) + "..." : book.Book_Title}</p>
                            <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} radius="small" itemStyles={myStyles} />
                    </HoverCardContent>
                    </HoverCard>
                ))


            }


        </div>
        </div>
    )
}