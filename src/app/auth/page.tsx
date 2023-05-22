'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs'

import { ControledInput } from '@ui/input'
import { RetturnButton } from '@ui/retturnButton'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputHandle = (setter: any) => (e: any) => {
    if (e) setter(e.target?.value)
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="pt-5 pl-10 flex self-start">
          <RetturnButton href="./" />
        </div>
        <div className="h-[90vh] flex flex-col justify-center">
          <form className="flex flex-col w-96 ">
            <div>
              <h1 className="text-center text-4xl">Welcome Back</h1>
            </div>
            <p className="text-center py-6">Log in with</p>
            <div className="flex justify-center gap-12 py-2">
              <BsGithub className="h-10 w-10 cursor-pointer" />
              <BsGoogle className="h-10 w-10 cursor-pointer" />
              <BsDiscord className="h-10 w-10 cursor-pointer" />
            </div>
            <p className="text-center pt-6 pb-4">Or login with email</p>
            <ControledInput
              onChange={inputHandle(setEmail)}
              value={email}
              placeholder="Email"
              type="email"
              label="Email"
              id="email"
            />
            <ControledInput
              onChange={inputHandle(setPassword)}
              value={password}
              placeholder="Password"
              type="password"
              label="Password"
              id="password"
            />
            <div className="flex gap-10 pt-4">
              <div className="flex gap-2">
                <Checkbox.Root
                  className="flex h-[25px] w-[25px] border border-black appearance-none items-center justify-center rounded-[4px] bg-white outline-none focus:shadow-[0_0_0_2px_black]"
                  defaultChecked
                  id="c1"
                >
                  <Checkbox.Indicator className="text-violet11">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="Session">Keep me loged in</label>
              </div>
              <div>
                <Link href="./auth/forgot" className="text-blumine-500">
                  Forget your password?
                </Link>
              </div>
            </div>
            <div className="pt-4">
              <button className="w-full bg-green rounded-lg h-12 relative after:rounded-lg after:top-1 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black hover:after:top-0 hover:after:left-0 hover:after:bottom-0 hover:after:right-0 hover:translate-x-1 hover:translate-y-1 hover:after:bg-transparent cursor-pointer">
                Log In
              </button>
            </div>
          </form>
          <div className="pt-4 place-self-center">
            <p>
              Dont have a account?{' '}
              <Link href="/auth/signup" className="text-blumine-500">
                {' '}
                Sign up{' '}
              </Link>{' '}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
