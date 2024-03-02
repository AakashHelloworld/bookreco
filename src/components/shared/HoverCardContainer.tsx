"use client"
import { Card } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import React, { useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Rating , Heart} from '@smastrom/react-rating'
import { useMutation } from "@tanstack/react-query";
import {URL} from "@/data/URL"
import { useGlobalContext } from "@/provider/state-manager";  
import { toast } from "@/components/ui/use-toast";
import { useGetReview } from "@/hooks/useGetReview";
interface Context {
    state?: {
        username: string;
        id: string;
        }  
  }

export default function HoverCardContainer({book}: {book: any}) {
  const { state }: Context = useGlobalContext()
  const {data:review} = useGetReview({bookId: book.ISBN, userId: state?.id})
  console.log(review)
  const [rating, setRating] = React.useState(review?.rating || 0)


  useEffect(() => {
    if(review?.rating) {
      setRating(review.rating)
    }
  }, [review])


  const addReview = useMutation({
    mutationKey: ["addReview"],
    mutationFn: async(data: any) => {
      return await fetch(`${URL}review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    }
  })

  const addReviewHandler = () => {
    console.log({bookID: book.ISBN, rating: rating, userID: state?.id})
    if(!state?.id || !book.ISBN || !rating) {
      toast({
        title: "Review Status",
        description: "Please Login To Add Review",
        variant: "destructive",
      })
    }
    addReview.mutateAsync({bookID: book.ISBN, rating: rating, userID: state?.id, book_title: book.Book_Title}).then((res) => {
      console.log(res)
      toast({
        title: "Review Status",
        description: "Review Added Successfully",
        variant: "success",
      })
    })
  }

  const myStyles = {
    itemShapes: Heart,
    activeFillColor: 'red',
    inactiveFillColor: '#ffd7ef'
  }
 return (
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

      <HoverCardContent className="h-[400px] w-[300px] flex flex-col justify-between" align="start" side="right">
          <p title={book?.Description}><span className="text-sm font-semibold" >Description: </span>{book?.Description?.length > 100  ? book?.Description?.slice(0, 100) + "..." : book.Book_Title}</p>
          <p  className="text-[orange]"><span className="text-sm font-semibold text-[black]" >Good Read Rating: </span>{book?.Rating}</p>
          
          <p><span className="text-sm font-semibold" >ISBN: </span>{book?.ISBN}</p>

          <p><span className="text-sm font-semibold" >Publisher: </span>{book?.Publisher}</p>

          <p><span className="text-sm font-semibold" >Year: </span>{book?.year}</p>

          <p><span className="text-sm font-semibold" >Pages: </span>{book?.NoOfPages}</p>
          <Rating style={{ maxWidth: 150 }} value={rating} onChange={setRating} radius="small" itemStyles={myStyles} />
          <Button className='bg-[#fff] text-[orange] border border-2 border-[orange] hover:bg-[#fff] hover:text-[#232e7f]'   onClick={addReviewHandler}>Submit</Button>
  </HoverCardContent>
  </HoverCard>

        
        )
}