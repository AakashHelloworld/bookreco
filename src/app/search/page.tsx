"use client"
import React from "react"
import Navbar from "@/components/shared/Navbar";
import { Card } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Rating , Heart} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import PaginationContainer from "@/components/shared/PaginationContainer";
import { usePopular } from "@/hooks/usePopular";
import { useRecomendation } from "@/hooks/useRecomendation";
import HoverCardContainer from "@/components/shared/HoverCardContainer";
export default function Search() {
  const searchParams = useSearchParams();

  const searchBook = searchParams.get("search-book") || "";

  const page = searchParams.get("page") || 1

  const {data:populars} = usePopular({pagenumber: +page})

  const {data:recomendationBooks} = useRecomendation({bookname: searchBook, pagenumber: +page})

  console.log(recomendationBooks)
  const [rating, setRating] = React.useState(0)
  const myStyles = {
      itemShapes: Heart,
      activeFillColor: '#ff41b4',
      inactiveFillColor: '#ffd7ef'
    }


  return (
    <div className="">
        <Navbar />
        <div className="w-full p-10">
          <div>
            <h1 className="text-3xl font-bold ml-4 mb-4">{`${searchBook ? 'Similar Books Related To ' + searchBook : "TOP POPULAR BOOKS"}`}</h1>
          </div>
          <div className="flex flex-wrap gap-14 w-full justify-around">
            
            
            { !searchBook &&
             populars?.data?.length &&   populars?.data.map((book: any) => (
              <HoverCardContainer book={book} />
              ))
            }

            {

              searchBook &&

              recomendationBooks?.data?.length &&   recomendationBooks?.data.map((book: any, index: number) => {
                  if (index === 0) {
                    return 
                  } 
                return(
                <HoverCardContainer book={book} />
              )})
            }


        </div>
        </div>
        {
          !searchBook &&
        <div className="w-full p-5">
        <PaginationContainer page={+page} count=
        {populars?.count} />
        </div>
        }

        {
          searchBook &&
        <div className="w-full p-5">
        <PaginationContainer searchBook={searchBook} page={+page} count=
        {recomendationBooks?.count} />
        </div>
        }
    </div>
  )
}
