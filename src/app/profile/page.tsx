import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdLogout } from "react-icons/md";
import { Card } from "@/components/ui/card"

export default function Profile() {
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

        <div>
            <Navbar />
            <div className="flex w-full mt-10 justify-center">

                <Avatar className="w-20 h-20 ">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-center w-full mt-10 justify-center">
                <h1>Aakash Bandhu Aryal</h1>
                <div className="flex p-2 bg-slate-200 rounded-lg mt-2 cursor-pointer"><MdLogout style={{ fontSize: "20px" }} /> <span className="ml-2">Logout</span></div>
            </div>
            <div className=" p-10">
                <h1 className="text-3xl font-bold ml-4 mb-4">Rated Books</h1>

                <div className="flex flex-wrap gap-14 w-full justify-around">
            {
                books.map((book) => (
                        <Card
                            className="h-[300px] w-[200px] cursor-pointer overflow-hidden "
                            key={book.name}>
                            <div className="h-[80%] w-full overflow-hidden">
                            <img className="h-full w-full object-cover" src={book.image} alt={book.name} />
                            </div>
                            <h1 title={book.name} className="font-semibold text-sm m-2"> <span className="opacity-70 text-sm">Name: </span>{ book.name.length > 15  ? book.name.slice(0, 15) + "..." : book.name}</h1>
                            <p title={book.author} className="font-semibold text-sm m-2"><span className="opacity-70 text-sm">Author: </span>{ book.author.length > 15  ? book.author.slice(0, 15) + "..." : book.author}</p>
                           
                        </Card>

                ))


            }


        </div>


            </div>
        </div>
    )


}