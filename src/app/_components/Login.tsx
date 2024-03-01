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
  
export default function Login() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Register</TabsTrigger>
        <TabsTrigger value="password">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" defaultValue="JOHN DOE" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" defaultValue="" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsOpen(true)}>Save Account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
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
              <Input id="username" type="text" defaultValue="JOHN DOE" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password"> Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setIsOpen(true)}>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
          {  isOpen &&
            <Modal isOpen={true} onClose={() => setIsOpen(false)}>
              <Favourite />
            </Modal>
          }
    </>
  )
}