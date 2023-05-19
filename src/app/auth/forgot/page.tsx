'use client'

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@ui/button';
import RetturnButton from '@ui/retturnButton';
import { recoveryContent } from 'src/translate/login/recovery';

export default function Passwordchange() {

  const [email, setEmail] = useState('')

  const { subTitle, submit, title } = recoveryContent['pt-BR']

  return (
    <>
      <main className='flex flex-col items-center'>
        <div className='pt-5 pl-10 flex self-start'>
          <RetturnButton
            text=''
            href='./auth'
          />
        </div>
        <ToastContainer limit={3} />
        <section className='flex flex-col justify-center h-[90vh]  lg:w-96'>
          <form className='pt-8'>
            <div>
              <h1 className='text-center text-4xl'>{title}</h1>
            </div>
            <p className='text-center py-6 text-xl'>{subTitle}</p>
            <div className="flex flex-col gap-2 pt-4 relative">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your name"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
              <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
            </div>
            <div className='pt-4'>
              <button className="w-full bg-[#138859] rounded-lg h-12 relative after:rounded-lg after:top-1 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black hover:after:top-0 hover:after:left-0 hover:after:bottom-0 hover:after:right-0 hover:translate-x-1 hover:translate-y-1 hover:after:bg-transparent cursor-pointer">
                Log In
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
