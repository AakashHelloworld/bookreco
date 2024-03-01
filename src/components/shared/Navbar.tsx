"use client"
import React from "react";
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


export default function Navbar() {
    const router = useRouter();
    const [text, setText] = React.useState("");

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
                <span className="text-sm px-2 opacity-70">Aakash Bandhu Aryal</span>
                <DropdownMenuSeparator />

                    <Link href="/profile" >
                <DropdownMenuItem className="cursor-pointer">
                    <CgProfile style={{ fontSize: "20px" }} />
                    <span className="ml-2" >Profile</span>
                    </DropdownMenuItem>
                    </Link>
                    <Link href="/" >
                <DropdownMenuItem className="cursor-pointer">
                    <MdLogout style={{ fontSize: "20px" }} /> <span className="ml-2">Logout</span>
                </DropdownMenuItem>
                </Link>
                </DropdownMenuContent>
            </DropdownMenu>

            </div>
         </div>
    );
}