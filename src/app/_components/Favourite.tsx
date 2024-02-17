import { Card } from "@/components/ui/card"
export default function Favourite() {

    const books = [
        {
            name: "Harry Potter",
            author: "Author 1",
            image: "https://m.media-amazon.com/images/I/71sH3vxziLL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "Flowers for Algernon",
            author: "Author 2",
            image: "https://m.media-amazon.com/images/I/61nP-IYQd2L._AC_UF1000,1000_QL80_.jpg"

        },
        {
            name: "Monk who sold his Ferrari",
            author: "Author 3",
            image: "https://static-01.daraz.com.np/p/33b37db4172a2544cff2bc88d011aba6.jpg"
        },
        {
            name: "How to think like a roman empire",
            author: "Author 4",
            image: "https://m.media-amazon.com/images/I/7173Hedc4ZL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "Can't Hurt Me",
            author: "Author 5",
            image: "https://m.media-amazon.com/images/I/81gTRv2HXrL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "Can't Hurt Me",
            author: "Author 5",
            image: "https://m.media-amazon.com/images/I/81gTRv2HXrL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "How to think like a roman empire",
            author: "Author 4",
            image: "https://m.media-amazon.com/images/I/7173Hedc4ZL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "Flowers for Algernon",
            author: "Author 2",
            image: "https://m.media-amazon.com/images/I/61nP-IYQd2L._AC_UF1000,1000_QL80_.jpg"

        },
        {
            name: "Harry Potter",
            author: "Author 1",
            image: "https://m.media-amazon.com/images/I/71sH3vxziLL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            name: "Monk who sold his Ferrari",
            author: "Author 3",
            image: "https://static-01.daraz.com.np/p/33b37db4172a2544cff2bc88d011aba6.jpg"
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
    )
}