'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { AiOutlineCalendar, AiOutlineHeart } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'

import { diaryId, diaryPage } from 'src/context/diaryContext'
import { useUser } from '@clerk/nextjs'

import { EmotionInput } from '@components/EmotionInput'
import { RetturnButton } from '@components/retturnButton'
import ToolbarComponent from '@components/toolbar'

import { emotionsOptions } from 'src/context/emotionsOptions'
import { todayDateToDateInput } from 'src/helpers/dateHelpers'
import axios from 'axios'

interface IParams {
  params: {
    id: string
  }
}

const NovaPagina = ({ params }: IParams) => {
  const dateInput = todayDateToDateInput()
  const router = useRouter()
  const paramsid = params.id.slice(5, params.id.length)

  const [title, setTitle] = useState('')
  const [emotion, setemotion] = useState('')
  const [text, setText] = useState('')
  const [color, setColor] = useState('')
  const [date, setdate] = useState(dateInput)

  const [diary, setdiary] = useAtom(diaryPage)
  const [options, setoptions] = useAtom(emotionsOptions)
  const { user } = useUser()

  useEffect(() => {
    if (params.id !== 'new-page') {
      const page = diary.filter(page => String(page.id) === paramsid)
      setTitle(page[0].title)
      setemotion(page[0].emotion)
      setText(page[0].text)
      setdate(page[0].date.split('T')[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title === '' || date === '') {
      const notify = () =>
        toast.warn('Por favor insira ao menos o titulo e date')
      notify()
      return
    }

    const notes = {
      title,
      date,
      emotion,
      text,
      color,
      authorId: user?.id
    }

    await axios.post('../api/page', notes)
    router.push('./dashboard')
  }

  const updatePage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title === '' || date === '') {
      const notify = () => toast.warn("Por favor insira ao menos o titulo e date");
      notify()
      return
    }

    const notes = {
      title,
      date,
      emotion,
      text,
      color,
    }

    await axios.patch(`../api/page/pageId=${paramsid}`, notes)
    router.push('./dashboard')
  }

  return (
    <section className="w-full">
      <ToastContainer />
      <div className="pt-7 pl-10">
        <RetturnButton href="/dashboard" />
      </div>
      <section className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 border border-black rounded-md px-5 mx-64 py-5 ">
        <form className="flex flex-col gap-6" onSubmit={(e) => params.id !== 'new-page' ? updatePage(e) : submitPage(e)}>
          <div className="flex items-center justify-between">
            <input
              className="bg-transparent focus:outline-none p-4 text-3xl w-full"
              placeholder="Give a title"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex w-full gap-3 items-center">
              <AiOutlineCalendar className="w-6 h-6" />
              <input
                type="date"
                className="bg-transparent h-[40px] px-2 border-[1px] w-[176px] border-black  rounded-md focus:outline-none text-center"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-3 items-center">
              <AiOutlineHeart className="w-6 h-6" />
              <EmotionInput
                options={options}
                setoption={setoptions}
                setState={setemotion}
                setColor={setColor}
                value={emotion}
              />
            </div>
          </div>
          <hr />
          <textarea
            className="h-96 2xl:h-[400px] bg-transparent focus:outline-none p-3 text-lg placeholder:italic resize-none tracking-wide leading-relaxed sm:indent-5 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400"
            placeholder="Start writing about your day"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <ToolbarComponent />
          <div className="flex ">
            {params.id !== 'new-page' ?
              <button
                className="bg-green p-4 rounded-md"
              >
                Update the diary
              </button>
              :
              <button
                className="bg-green p-4 rounded-md"
              >
                Insert in diary
              </button>
            }
          </div>
        </form>
      </section>
    </section>
  )
}

export default NovaPagina
