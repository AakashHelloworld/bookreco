'use client';
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../ui/button';

interface ModalProps {
  title?: string
  isOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 grid place-content-center w-[100vw] h-[100vh] z-50	 border  border-slate-200 dark:border-slate-700 rounded-lg ">
      <div className="absolute top-0 left-0 w-full min-h-full py-3 px-3 grid place-items-center">
        <div className="bg-white rounded-md w-full h-full z-50 border border-1 border-[black] relative">
          <div className="pt-4 p-6">{children}</div>
          <div className="flex gap-2 absolute bottom-0 right-0 p-4">
          <Button className='bg-[#fff] text-[#232e7f] border border-2 border-[#232e7f] hover:bg-[#fff] hover:text-[#232e7f]' onClick={onClose}>Skip</Button>
          <Button className='bg-[#fff] text-[#232e7f] border border-2 border-[#232e7f] hover:bg-[#fff] hover:text-[#232e7f]' onClick={onClose}>Submit</Button>
          </div>
        </div>
        <div
          className="absolute top-0 left-0 w-full min-h-full bg-[#fff] opacity-60 z-40"
        ></div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
