'use client'

import { useUser } from '@clerk/nextjs';
import { Button } from '@components/ui/button';
import { ControledInput } from '@components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Fieldchange() {
  const [field, setfield] = useState('')
  const [fieldVerify, setfieldVerify] = useState('')

  const router = useRouter()
  const params = useParams()
  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (field !== fieldVerify) {
      const notify = () => toast.error("As campos inseridos estão diferentes");
      notify()
      return
    }


    try {
      if (params.reset === 'email') {
        await user?.update({ primaryEmailAddressId: field })
        router.push('/login')
        return
      }
      await user?.updatePassword({ newPassword: field })
      router.push('/login')
      return
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
            <ControledInput type={params.reset} id='reset1' placeholder={params.reset} value={field} onChange={setfield} />
          </div>
          <div className='flex flex-col gap-3'>
            <label htmlFor='reset2'>
              {`Confirm your ${params.reset}`}
            </label>
            <ControledInput type={params.reset} id='reset2' placeholder={`your new ${params.reset}`} value={fieldVerify} onChange={setfieldVerify} />
          </div>
        </div>
        <div className='pt-4'>
          <Button Children={'Reset'} intent='success' Width='full' />
        </div>
      </form>
    </>
  )
}
