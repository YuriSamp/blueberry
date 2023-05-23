'use client'

import React, { ChangeEvent, FormEvent, useCallback, useReducer } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'

import { ControledInput } from '@ui/input'
import { RetturnButton } from '@ui/retturnButton'

type formState = {
  name: string
  email: string
  password: string
  confirmPassword: string
  photo: string
}

const initialState: formState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: '',
}

function reducer(state: formState, action: any) {
  return { ...state, ...action }
}

const formSchema = z
  .object({
    name: z.string().min(1, 'Empty name field').max(40, 'Name too long'),
    email: z.string().min(1, 'Empty email field').email('Invalid Email'),
    password: z.string().min(8, 'insufficient password length'),
    confirmPassword: z.string().min(8, 'insufficient confirm password length'),
    photo: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  })

const fields = [
  'name',
  'email',
  'password',
  'confirmPassword',
  'photo',
] as const

export default function SignUp() {
  const [form, formDispatch] = useReducer(reducer, initialState)

  const inputHandle = useCallback(
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => formDispatch({ [type]: e.target.value }),
    [formDispatch]
  )

  const formHandle = (event: FormEvent) => {
    event.preventDefault()
    const parsedFields = formSchema.safeParse(form)
    if (parsedFields.success) {
      return
    }

    const fieldErrors = parsedFields.error.formErrors.fieldErrors

    for (let i = 0; i < fields.length - 1; i++) {
      if (fieldErrors[fields[i] as keyof formState]) {
        toast.error(fieldErrors[fields[i] as keyof formState]?.at(0))
        break
      }
    }
    toast.error(parsedFields.error.flatten().formErrors[0])
  }

  return (
    <>
      <main className="flex flex-col items-center">
        <ToastContainer />
        <div className="pt-5 pl-10 flex self-start">
          <RetturnButton href="./auth" text="" />
        </div>
        <div className="h-[90vh] flex flex-col justify-center">
          <form className=" flex flex-col w-96" onSubmit={formHandle}>
            <div>
              <h1 className="text-center text-4xl">Sign Up</h1>
            </div>
            <ControledInput
              onChange={inputHandle('name')}
              placeholder="Your name"
              type="text"
              value={form.name}
              id="name"
              label="Name"
            />
            <ControledInput
              onChange={inputHandle('email')}
              placeholder="Email Adress"
              type="email"
              value={form.email}
              id="email"
              label="Email Adress"
            />
            <ControledInput
              onChange={inputHandle('password')}
              placeholder="Password"
              type="password"
              value={form.password}
              id="password"
              label="Password"
            />
            <ControledInput
              onChange={inputHandle('confirmPassword')}
              placeholder="password"
              type="password"
              value={form.confirmPassword}
              id="confirmPassword"
              label="Confirm your password"
            />

            <p className="pt-4 text-center"> This field bellow is optional</p>

            <ControledInput
              onChange={inputHandle('photo')}
              placeholder="Insert a url"
              type="text"
              value={form.photo}
              id="url"
              label="Insert a photo"
            />
            <div className="pt-8">
              <button className="w-full bg-green rounded-lg h-12 relative after:rounded-lg after:top-1 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black hover:after:top-0 hover:after:left-0 hover:after:bottom-0 hover:after:right-0 hover:translate-x-1 hover:translate-y-1 hover:after:bg-transparent cursor-pointer ">
                Create a accont
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
