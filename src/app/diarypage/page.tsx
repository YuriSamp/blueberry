"use client"

import { AiOutlineCalendar, AiOutlineHeart } from 'react-icons/ai'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { diaryId, diaryPage } from 'src/context/diaryContext'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import { Navbar } from '@ui/navbar'
import { emotionsOptions } from 'src/context/emotionsOptions'
import { todayDateToDateInput } from 'src/helpers/dateHelpers'
import { EmotionInput } from '@ui/input/emotionInput'
import RetturnButton from '@ui/retturnButton'

const NovaPagina = () => {

  const dateInput = todayDateToDateInput()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [feeling, setFeeling] = useState('Feliz')
  const [text, setText] = useState('')
  const [data, setData] = useState(dateInput)
  const [_, setdiary] = useAtom(diaryPage);
  const [id, setdiaryId] = useAtom(diaryId);
  const [options, setoptions] = useAtom(emotionsOptions)
  const [color, setColor] = useState('')

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || data === '') {
      const notify = () => toast.warn("Por favor insira ao menos o titulo e data");
      notify()
      return
    }

    const notes = {
      title,
      data,
      feeling,
      text,
      id,
      color
    }

    setdiary(prev => [...prev, notes])
    setdiaryId(prev => prev + 1)
    router.push('./dashboard')
  }

  return (
    <>
      <Head>
        <title>Fyesta</title>
      </Head>
      <section className='w-full'>
        <Navbar />
        <div className='pt-5 pl-10'>
          <RetturnButton href='/dashboard' text='Voltar ao dashboard' />
        </div>
        <section
          className='flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 bg-white px-12 py-5 select-none text-black'>
          <form className='flex flex-col gap-8' onSubmit={e => handleForm(e)}>
            <input
              className='bg-transparent focus:outline-none p-4 text-3xl'
              placeholder='Insira um titulo'
              autoFocus={true}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className='flex flex-col gap-6'>
              <div className='flex w-full gap-3 items-center'>
                <AiOutlineCalendar className='w-6 h-6' />
                <input
                  type='date'
                  className='bg-transparent h-[40px] px-2 border-[1px] w-[176px] border-black  rounded-md focus:outline-none text-center'
                  value={data}
                  onChange={e => setData(e.target.value)}
                />
              </div>
              <div className='flex w-full gap-3 items-center'>
                <AiOutlineHeart className='w-6 h-6' />
                <EmotionInput
                  options={options}
                  setoption={setoptions}
                  setState={setFeeling}
                  setColor={setColor}
                  defaultValue=''
                  placeholder={'Procure o sentimento'}
                />
              </div>
            </div>
            <hr />
            <textarea
              className='h-96 2xl:h-[400px] bg-transparent focus:outline-none p-3 text-lg placeholder:italic resize-none tracking-wide leading-relaxed sm:indent-5 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400'
              placeholder='Comece a escrever sobre o seu dia'
              onChange={e => setText(e.target.value)}
            />
            <div className='flex '>
              <button className='bg-green-700 p-4 rounded-md text-white'>Incluir no diario</button>
            </div>
          </form>
          <ToastContainer limit={3} />
        </section>
      </section>
    </>
  )
}

export default NovaPagina
