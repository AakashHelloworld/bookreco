"use client"
import React, { useEffect , useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {URL} from "@/data/URL"
import { useGetMe } from "@/hooks/useGetMe";
import { useGlobalContext } from "@/provider/state-manager";  
interface Context {
  state?: {
      username: string;
      password: string;
      }
  dispatch?: (value: { type: string , payload: boolean}) => void
}




export default function Navbar() {
    const router = useRouter();
    const [text, setText] = React.useState("");
    const { state,  dispatch}: Context = useGlobalContext()
    const [user, setUser] = useState<any>();

    const fetchAPI =  () => {

            const response = fetch(URL + `get-user`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify({})
            }).then((res) => res.json()).then((data) =>
           { 
            console.log(data)
            setUser(data)}
            )
    
      }
      useEffect(() => {
          fetchAPI()
      }, []);
    
    
      useEffect(() => {
          if(user?.success == false){
              router.push("/")
          }
          if(user?.user && dispatch)
                dispatch({type: "ADD_USER", payload: user?.user} as any)
          
      },[user])


    const submitHandler = (e : any) => {
        e.preventDefault();
        router.push(`/search?search-book=${text}`)

    }
    return (
        <div className="flex justify-between h-16 w-full   items-center p-4 border-b border-slate-200 ">
            
            <Link href="/"><div >
                <img src="/images/logo.svg" className="h-[150px] w-[150px]" />
            </div>
            </Link>


        <div className="flex gap-2 items-center">
            <form onSubmit={submitHandler}>
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Search" className="w-80 h-8 " />
            </form>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                 </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5">
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <span className="text-sm px-2 opacity-70">{user?.user?.username ? user?.user?.username : "----"}</span>
                <DropdownMenuSeparator />

                    <Link href="/profile" >
                <DropdownMenuItem className="cursor-pointer">
                    <CgProfile style={{ fontSize: "20px" }} />
                    <span className="ml-2" >Profile</span>
                    </DropdownMenuItem>
                    </Link>
                    <Link href="/" >
                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    localStorage.setItem("token", "")
                    router.push("/")
                }}>
                    <MdLogout style={{ fontSize: "20px" }} /> <span className="ml-2">Logout</span>
                </DropdownMenuItem>
                </Link>
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
         </div>
    );
}