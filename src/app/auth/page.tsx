import Link from 'next/link'
import React from 'react'
import { BsGithub, BsDiscord, BsGoogle } from 'react-icons/bs'


export default function Auth() {
  return (
    <>
      <main className='flex flex-col justify-center items-center min-h-screen bg-[#f9f5f2]'>
        <form className='flex flex-col'>
          <div>
            <h1 className='text-center text-4xl'>Welcome Back</h1>
          </div>
          <p className='text-center py-6'>Log in with</p>
          <div className='flex justify-center gap-12 py-2'>
            <BsGithub className='h-10 w-10 cursor-pointer' />
            <BsGoogle className='h-10 w-10 cursor-pointer' />
            <BsDiscord className='h-10 w-10 cursor-pointer' />
          </div>
          <p className='text-center pt-6 pb-4'>Or login with email</p>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Email Adress</label>
            <input type='email' placeholder='Email Adress' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Password</label>
            <input type='password' placeholder='Password' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex gap-10 pt-4'>
            <div className='flex gap-2'>
              <input type='checkbox' className='' id='Session' />
              <label htmlFor='Session'>Keep me loged in</label>
            </div>
            <div>
              <Link href='#' className='text-cyan-700'> Forget your password?</Link>
            </div>
          </div>
          <div className='pt-4'>
            <button className='w-full bg-[#138859] rounded-lg h-12'>Log In</button>
          </div>
        </form>
        <div className='pt-4'>
          <p>Dont have a account? <Link href='./signup' className='text-cyan-700'> Sign up </Link> </p>
        </div>
      </main>
    </>
  )
}
