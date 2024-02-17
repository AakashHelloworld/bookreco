"use client"
import React , { useState } from "react"
import Modal from "@/components/shared/Modal";
import Favourite from "./Favourite";
  
export default function Login() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <button onClick={() => setIsOpen(true)} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg  hover:border-slate-400 hover:opacity-70 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Login with Google</span>
    </button>
          {  isOpen &&
            <Modal isOpen={true} onClose={() => setIsOpen(false)}>
              <Favourite />
            </Modal>
          }
    </>
  )
}