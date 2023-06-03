'use client'

import { Button } from '@components/ui/button';
import { ControledInput } from '@components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Passwordchange() {
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  const router = useRouter()
  const params = useParams()
  console.log(params)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordVerify) {
      const notify = () => toast.error("As senhas inseridas estão diferentes");
      notify()
      return
    }

    try {
      // const DidUpdate = await updatePassword(password)
      // if (DidUpdate) router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className='flex flex-col lg:w-96'>
        <div>
          <h1 className='text-center text-4xl'>{`Reset your ${params.reset}`}</h1>
        </div>
        <p className='text-center py-6 text-xl'>{`Dont worry, just type your new ${params.reset}`}</p>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-3'>
            <label htmlFor='reset1'>
              {params.reset}
            </label>
            <ControledInput type={params.reset} id='reset1' placeholder={params.reset} value={password} onChange={setPassword} />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='reset2'>
              {`Confirm your ${params.reset}`}
            </label>
            <ControledInput type={params.reset} id='reset2' placeholder={`your new ${params.reset}`} value={passwordVerify} onChange={setPasswordVerify} />
          </div>
        </div>
        <div className='pt-4'>
          <Button Children={'Reset'} intent='success' Width='full' />
        </div>
      </form>
    </>
  )
}
