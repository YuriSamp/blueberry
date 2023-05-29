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
  const paramsid = Number(params.id.slice(5, 8))

  const [title, setTitle] = useState('')
  const [emotion, setemotion] = useState('')
  const [text, setText] = useState('')
  const [color, setColor] = useState('')
  const [date, setdate] = useState(dateInput)

  const [diary, setdiary] = useAtom(diaryPage)
  const [id, setdiaryId] = useAtom(diaryId)
  const [options, setoptions] = useAtom(emotionsOptions)
  const { user } = useUser()


  useEffect(() => {
    if (paramsid !== id) {
      setTitle(diary[paramsid - 1]?.title)
      setemotion(diary[paramsid - 1]?.emotion)
      setText(diary[paramsid - 1]?.text)
      setdate(diary[paramsid - 1]?.date)
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
      id: String(id),
      authorId: user?.id
    }

    await axios.post('../api/page', notes)
    // setdiary((prev) => [...prev, notes])
    // setdiaryId((prev) => prev + 1)
    // router.push('./dashboard')
  }

  const updatePage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (title === '' || date === '') {
      const notify = () => toast.warn("Por favor insira ao menos o titulo e date");
      notify()
      return
    }

    const updated = diary.map(item => {
      if (item.id === paramsid) {
        item.title = title
        item.date = date
        item.emotion = emotion
        item.text = text
        item.color = color
      }
      return item
    })

    setdiary(updated)
    router.push('./dashboard')
  }

  return (
    <section className="w-full">
      <ToastContainer />
      <div className="pt-7 pl-10">
        <RetturnButton href="/dashboard" />
      </div>
      <section className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 border border-black rounded-md px-5 mx-64 py-5 ">
        <form className="flex flex-col gap-6" onSubmit={(e) => paramsid !== id ? updatePage(e) : submitPage(e)}>
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
            {paramsid !== id ?
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
