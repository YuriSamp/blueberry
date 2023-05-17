import React from 'react'

export default function SignUp() {
  return (
    <>
      <main className='flex justify-center items-center min-h-screen bg-[#f9f5f2]'>
        <form className=' flex flex-col w-96'>
          <div>
            <h1 className='text-center text-4xl'>Sign Up</h1>
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Name</label>
            <input type='text' placeholder='Your name' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Email Adress</label>
            <input type='email' placeholder='Email Adress' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Password</label>
            <input type='password' placeholder='Password' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label>Confirm your password</label>
            <input type='password' placeholder='Password' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='flex flex-col gap-2 pt-4'>
            <label >Insert a photo</label>
            <input type='text' placeholder='Insert a url' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
            <p className='text-center py-2'>Or</p>
            <input type='text' placeholder='Future drag-and-drop' className='py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]' />
          </div>
          <div className='pt-8'>
            <button className='w-full bg-[#138859] rounded-lg h-12 '>Create a accont</button>
          </div>
        </form>
      </main>
    </>
  )
}
