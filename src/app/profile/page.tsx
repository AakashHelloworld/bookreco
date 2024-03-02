"use client";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdLogout } from "react-icons/md";
import { Card } from "@/components/ui/card"
import { useGetMe } from "@/hooks/useGetMe";
import { useRouter } from "next/navigation";
import { useGetMyReview } from "@/hooks/useMyGetReview";
import { useGlobalContext } from "@/provider/state-manager";  
import { Rating , Heart} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Context {
    state?: {
        username: string;
        id: string;
        }
    dispatch?: (value: { type: "SET_COMPLETED" , payload: boolean}) => void    
  }
export default function Profile() {
    const { state  }: Context = useGlobalContext()
    const router = useRouter();
    const myStyles = {
        itemShapes: Heart,
        activeFillColor: 'red',
        inactiveFillColor: '#ffd7ef'
    }
    const {data: user} = useGetMe()
    const {data:myreviewBooks} = useGetMyReview(state?.id)
    console.log(myreviewBooks)
    

    return (

        <div>
            <Navbar />
            <div className="flex w-full mt-10 justify-center">

                <Avatar className="w-[200px] h-[200px] ">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-center w-full mt-10 justify-center">
                <h1 className="text-3xl font-bold capitalize">{user?.user?.username}</h1>
                <div className="flex p-2 bg-slate-200 rounded-lg mt-2 cursor-pointer"><MdLogout style={{ fontSize: "20px" }} /> <span className="ml-2" onClick={() => {
                    if (typeof window !== 'undefined'){
                    localStorage.setItem("token", "")
                    router.push("/")
                    }
                }}>Logout</span></div>
            </div>
            <div className=" p-10">
                <h1 className="text-3xl font-bold ml-4 mb-4">Rated Books</h1>

                <div className="flex flex-wrap gap-14 w-full ">

            {
                myreviewBooks?.reviews?.length &&
                myreviewBooks?.reviews.map((book    : any) => (
                    <HoverCard>
                    <HoverCardTrigger>
                        <Card
                            className="h-[300px] w-[200px] cursor-pointer overflow-hidden "
                            key={book?.book?.ISBN}>
                            <div className="h-[80%] w-full overflow-hidden">
                            <img className="h-full w-full object-cover" src={book?.book?.Image_URL_M} alt={book?.book?.Book_Title} />
                            </div>
                            <h1 title={book?.book?.Book_Title} className="font-semibold text-sm m-2"> <span className="opacity-70 text-sm">Name: </span>{ book?.book?.Book_Title.length > 15  ? book?.book?.Book_Title?.slice(0, 15) + "..." : book?.book?.Book_Title}</h1>
                            <p title={book.author} className="font-semibold text-sm m-2"><span className="opacity-70 text-sm">Author: </span>{ book?.book?.Book_Author?.length > 15  ? book?.book?.Book_Author?.slice(0, 15) + "..." : book?.book?.Book_Author}</p>
                           
                        </Card>
                    </HoverCardTrigger>
                  
                        <HoverCardContent className="h-[400px] w-[300px] flex flex-col justify-between" align="start" side="right">
                            <p><span className="text-sm font-semibold" >Description: </span>{book?.book?.Description?.length > 100  ? book?.book?.Description?.slice(0, 100) + "..." : book.Book_Title}</p>
                            <p  className="text-[orange]"><span className="text-sm font-semibold text-[black]" >Good Read Rating: </span>{book?.book?.Rating}</p>
                            
                            <p><span className="text-sm font-semibold" >ISBN: </span>{book?.book?.ISBN}</p>
                  
                            <p><span className="text-sm font-semibold" >Publisher: </span>{book?.book?.Publisher}</p>
                  
                            <p><span className="text-sm font-semibold" >Year: </span>{book?.book?.year}</p>
                  
                            <p><span className="text-sm font-semibold" >Pages: </span>{book?.NoOfPages}</p>
                            <Rating style={{ maxWidth: 150 }} value={book?.rating}  radius="small"  readOnly={true} itemStyles={myStyles} />
                           
                    </HoverCardContent>
                    </HoverCard>

                ))
            }


        </div>


            </div>
        </div>
    )


}