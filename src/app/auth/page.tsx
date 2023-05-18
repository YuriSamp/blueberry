import React from 'react'
import Link from 'next/link'

import { BsDiscord, BsGithub, BsGoogle } from 'react-icons/bs'
import RetturnButton from '@ui/retturnButton'

export default function Auth() {
  return (
    <>
      <main className="flex flex-col items-center">
        <div className='pt-5 pl-10 flex self-start'>
          <RetturnButton href='./' text='' />
        </div>
        <div className='h-[90vh] flex flex-col justify-center'>
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
            <div className="flex flex-col gap-2 pt-4">
              <label>Email Adress</label>
              <input
                type="email"
                placeholder="Email Adress"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
            </div>
            <div className="flex gap-10 pt-4">
              <div className="flex gap-2">
                <input type="checkbox" className="" id="Session" />
                <label htmlFor="Session">Keep me loged in</label>
              </div>
              <div>
                <Link href="#" className="text-cyan-700">
                  {' '}
                  Forget your password?
                </Link>
              </div>
            </div>
            <div className="pt-4">
              <button className="w-full bg-[#138859] rounded-lg h-12">
                Log In
              </button>
            </div>
          </form>
          <div className="pt-4 place-self-center">
            <p>
              Dont have a account?{' '}
              <Link href="/auth/signup" className="text-cyan-700">
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
