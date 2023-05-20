"use client"

import React from 'react'

import RetturnButton from '@ui/retturnButton'

export default function SignUp() {
  return (
    <>
      <main className="flex flex-col items-center">
        <div className="pt-5 pl-10 flex self-start">
          <RetturnButton href="./auth" text="" />
        </div>
        <div className="h-[90vh] flex flex-col justify-center">
          <form className=" flex flex-col w-96">
            <div>
              <h1 className="text-center text-4xl">Sign Up</h1>
            </div>
            <div className="flex flex-col gap-2 pt-4 relative">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
              <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>

            </div>
            <div className="flex flex-col gap-2 pt-4 relative">
              <label>Email Adress</label>
              <input
                type="email"
                placeholder="Email Adress"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
              <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
            </div>
            <div className="flex flex-col gap-2 pt-4 relative">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
              <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
            </div>
            <div className="flex flex-col gap-2 pt-4 relative">
              <label>Confirm your password</label>
              <input
                type="password"
                placeholder="Password"
                className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
              />
              <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex flex-col gap-2 relative">
                <label>Insert a photo</label>
                <input
                  type="text"
                  placeholder="Insert a url"
                  className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
                />
                <span className='after:rounded-lg after:top-10 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
              </div>
              <p className="text-center">Or</p>
              <div className="flex flex-col gap-2 relative">
                <label>Insert a photo</label>
                <input
                  type="text"
                  placeholder="drag-and-drop"
                  className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
                />
                <span className='after:rounded-lg after:top-10 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
              </div>
            </div>
            <div className="pt-8">
              <button className="w-full bg-[#138859] rounded-lg h-12 relative after:rounded-lg after:top-1 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black hover:after:top-0 hover:after:left-0 hover:after:bottom-0 hover:after:right-0 hover:translate-x-1 hover:translate-y-1 hover:after:bg-transparent cursor-pointer ">
                Create a accont
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
