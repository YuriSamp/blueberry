'use client'

import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ControledInput } from '@ui/input'
import RetturnButton from '@ui/retturnButton'

import { recoveryContent } from 'src/translate/login/recovery'

export default function Passwordchange() {
  const [email, setEmail] = useState('')

  const { subTitle, submit, title } = recoveryContent['pt-BR']

  const inputHandle = (setter: any) => (e: any) => {
    if (e) setter(e.target?.value)
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="pt-5 pl-10 flex self-start">
          <RetturnButton text="" href="./auth" />
        </div>
        <ToastContainer limit={3} />
        <section className="flex flex-col justify-center h-[90vh]  lg:w-96">
          <form className="pt-8">
            <div>
              <h1 className="text-center text-4xl">{title}</h1>
            </div>
            <p className="text-center py-6 text-xl">{subTitle}</p>
            <ControledInput
              onChange={inputHandle(setEmail)}
              value={email}
              placeholder="Email"
              type="email"
              label="Email"
              id="email"
            />
            <div className="pt-4">
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
