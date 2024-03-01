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
                <HoverCard>
                <HoverCardTrigger>
                    <Card
                        className="h-[300px] w-[200px] cursor-pointer overflow-hidden "
                        key={book?.Book_Title}>
                        <div className="h-[80%] w-full overflow-hidden">
                        <img className="h-full w-full object-cover" src={book?.Image_URL_M} alt={book.Book_Title} />
                        </div>
                        <h1 title={book.name} className="font-semibold text-sm m-2"> <span className="opacity-70 text-sm">Name: </span>{ book?.Book_Title.length > 15  ? book?.Book_Title?.slice(0, 15) + "..." : book?.Book_Title}</h1>
                        <p title={book.author} className="font-semibold text-sm m-2"><span className="opacity-70 text-sm">Author: </span>{ book?.Book_Author?.length > 15  ? book?.Book_Author?.slice(0, 15) + "..." : book?.Book_Author}</p>
                       
                    </Card>
                </HoverCardTrigger>

                    <HoverCardContent className="h-[300px] w-[300px] flex flex-col justify-between" align="start" side="right">
                        <p><span className="text-sm font-semibold" >Description: </span>{book?.Book_Title?.length > 100  ? book?.Book_Title?.slice(0, 200) + "..." : book.Book_Title}</p>
                        <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} radius="small" itemStyles={myStyles} />
                </HoverCardContent>
                </HoverCard>
                ))
            }

            {

              searchBook &&

              recomendationBooks?.data?.length &&   recomendationBooks?.data.map((book: any) => (
                <HoverCard>
                <HoverCardTrigger>
                    <Card
                        className="h-[300px] w-[200px] cursor-pointer overflow-hidden "
                        key={book?.ISBN}>
                        <div className="h-[80%] w-full overflow-hidden">
                        <img className="h-full w-full object-cover" src={book?.Image_URL_M} alt={book.Book_Title} />
                        </div>
                        <h1 title={book.Book_Title} className="font-semibold text-sm m-2"> <span className="opacity-70 text-sm">Name: </span>{ book?.Book_Title.length > 15  ? book?.Book_Title?.slice(0, 15) + "..." : book?.Book_Title}</h1>
                        <p title={book.author} className="font-semibold text-sm m-2"><span className="opacity-70 text-sm">Author: </span>{ book?.Book_Author?.length > 15  ? book?.Book_Author?.slice(0, 15) + "..." : book?.Book_Author}</p>
                       
                    </Card>
                </HoverCardTrigger>

                    <HoverCardContent className="h-[300px] w-[300px] flex flex-col justify-between" align="start" side="right">
                        <p><span className="text-sm font-semibold" >Description: </span>{book?.Book_Title?.length > 100  ? book?.Book_Title?.slice(0, 200) + "..." : book.Book_Title}</p>
                        <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} radius="small" itemStyles={myStyles} />
                </HoverCardContent>
                </HoverCard>

                
              ))
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
