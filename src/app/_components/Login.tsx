"use client"
import React , { useState } from "react"
import Modal from "@/components/shared/Modal";
import Favourite from "./Favourite";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast"
import {URL} from "@/data/URL"
import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/provider/state-manager";  
interface Context {
  state?: {
      username: string;
      password: string;
      }
  dispatch?: (value: { type: string , payload: boolean}) => void    
}

export default function Login() {
  const router = useRouter();
  const { state,  dispatch }: Context = useGlobalContext()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState("account")
  const { toast } = useToast()

  const [loginData, setLoginData] = useState({
    username: "JHON DOE",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  })

  const signup = useMutation({
    mutationKey: ['singup'],
    mutationFn: async() => { 
        return await fetch(`${URL}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData) 
        }).then((res) => res.json())


    },
  });

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async() => {
        return await fetch(`${URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }).then((res) => res.json())
    }
  })


  const signupSubmit = (e : any) => {
    e.preventDefault()
    console.log(registerData)
    if(!registerData.username || !registerData.password) return
    signup.mutateAsync().then((data) => {
        console.log(data)
        setRegisterData({
          username: "",
          password: "",
        })
        if(data?.success){
          setSelectedTab("login")
          toast({
            title: "Login Status",
            description: "User Successfully Registered",
            variant: "success",
          })



        }
        if(!data?.success){
          toast({
            title: "Login Status",
            description: "User Registration Failed",
            variant: "destructive",
            
          })
        }
    })
  }


  const loginSubmit = (e : any) => {
    e.preventDefault()
    if(!loginData.username || !loginData.password) return
    login.mutateAsync().then((data) => {
        console.log(data)
        setLoginData({
          username: "",
          password: "",
        })



          console.log(data?.token)
        if(data?.success){
          toast({
            title: "Login Status",
            description: "User Successfully Logged In",
            variant: "success",
          })
          if(dispatch) dispatch({type: "ADD_USER", payload: data?.user}) 

          localStorage.setItem("token", data?.token || "")
          if(localStorage.getItem("alreadyLogin") === "true"){
            router.push("/search")
          }else{
            setIsOpen(true)
          }



        }
        if(!data?.success){
          toast({
            title: "Login Status",
            description: "User Login Failed",
            variant: "destructive",
            
          })
        }
    })
  }
  return (
    <>
    <Tabs value={selectedTab}  className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" onClick={() => setSelectedTab("account")}>Register</TabsTrigger>
        <TabsTrigger value="login" onClick={() => setSelectedTab("login")}>Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2" >
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username"  value={registerData.username} onChange={(e) => setRegisterData({...registerData, username: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})}/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signupSubmit}>Save Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your username and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username"> Username</Label>
              <Input id="username" type="text" value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password"> Password</Label>
              <Input id="password" type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={loginSubmit}>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
          {  isOpen &&
            <Modal isOpen={true} onClose={() => {
              setIsOpen(false)
              localStorage.setItem("alreadyLogin", "true")
              router.push("/search")}
              
            }>
              <Favourite />
            </Modal>
          }
    </>
  )
}