"use client";
import React, { useState , useEffect} from "react";
import Login from "./_components/Login";
import { useRouter } from 'next/navigation';
import { useGetMe } from "@/hooks/useGetMe";
import { useGlobalContext } from "@/provider/state-manager";  
import {URL} from "@/data/URL"

interface Context {
  state?: {
      username: string;
      password: string;
      }
  dispatch?: (value: { type: string , payload: boolean}) => void
}


export default function Home() {  
  const router = useRouter();
  const { state,  dispatch}: Context = useGlobalContext()
  // const {data: user} = useGetMe()
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
      if(user?.success){
          if(user?.user  && dispatch)
            dispatch({type: "ADD_USER", payload: user?.user} as any)
            router.push("/search")
      }
      
  },[user])

  return (
      <div className="flex flex-col sm:flex-row min-h-screen h-screen">

        <div className=" w-[100%] sm:w-[60%] h-full relative ">
        

          <div className="bg-[url('/images/bookcoverpage.jpg')] bg-cover bg-center bg-no-repeat w-full h-full ">
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[100%] w-[100%] bg-gradient-to-br from-[#232e7f] to-[#f36026] opacity-80 z-10 flex items-end">
          <div className="text-white mb-10 ml-10 ">
            <img src="/images/home_logo.svg" className="h-[200px] w-[200px]" />
            {/* <h1 className=" text-4xl font-bold">BookReco</h1> */}
            <p className="text-xl font-medium mt-[-50px]">Platfom for your favorite books.</p>
            </div>
          </div>

        </div>

        <div className=" w-[100%] sm:w-[40%] flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2">
         <Login />
         </div>
        </div>

      </div>

  );
}
