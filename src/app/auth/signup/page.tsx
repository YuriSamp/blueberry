"use client"

import React, { useReducer, useCallback } from 'react'

import RetturnButton from '@ui/retturnButton'
import { ControledInput } from '@ui/input'

type formState = {
  name: string
  email: string
  password: string
  passwordConfirmed: string
  photo: string
}

const initialState: formState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmed: '',
  photo: ''
}

function reducer(state: formState, action: any) {
  return { ...state, ...action }
}

export default function SignUp() {

  const [form, formDispatch] = useReducer(reducer, initialState)

  const inputHandle = useCallback((type: string) => (e: any) => {
    if (e) formDispatch({ [type]: e.target.value })
  }, [formDispatch])

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
            <ControledInput
              onChange={inputHandle('name')}
              placeholder='Your name'
              type='text'
              value={form.name}
              id='name'
              label='name'
            />
            <ControledInput
              onChange={inputHandle('email')}
              placeholder='Email Adress'
              type='email'
              value={form.email}
              id='email'
              label='Email Adress'
            />
            <ControledInput
              onChange={inputHandle('password')}
              placeholder='Password'
              type='password'
              value={form.password}
              id='password'
              label='Password'
            />
            <ControledInput
              onChange={inputHandle('passwordConfirmed')}
              placeholder='password'
              type='password'
              value={form.passwordConfirmed}
              id='passwordConfirmed'
              label='Confirm your password'
            />


            <div className="flex flex-col">
              <ControledInput
                onChange={inputHandle('photo')}
                placeholder='Insert a url'
                type='text'
                value={form.photo}
                id='url'
                label='Insert a photo'
              />
              <p className="text-center pt-4">Or</p>
              <ControledInput
                onChange={inputHandle('photo')}
                placeholder='Insert a photo'
                type='text'
                value={form.photo}
                id='url'
                label='drag-and-drop'
              />
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
