'use client'

import { ChangeEvent, useEffect, useReducer } from 'react'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import { AiOutlineCalendar, AiOutlineHeart } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'

import { EmotionInput } from '@components/EmotionInput'
import { RetturnButton } from '@components/retturnButton'
import { Idiary, journalSchema, journalType } from '@lib/validations/diary'

import { diaryPage } from 'src/context/diaryContext'
import { todayDateToDateInput } from 'src/helpers/dateHelpers'
import { emotionsOptions } from 'src/context/emotionsOptions'

interface IParams {
  params: {
    id: string
  }
}

const dateInput = todayDateToDateInput()

const initialState: journalType = {
  title: '',
  date: dateInput,
  emotionID: '',
  text: ''
}

function reducer(state: journalType, action: Partial<journalType>) {
  return { ...state, ...action }
}

const NovaPagina = ({ params }: IParams) => {
  const router = useRouter()
  const id = params.id.slice(5, params.id.length)

  const [form, formDispatch] = useReducer(reducer, initialState)

  const inputHandle =
    (type: keyof journalType) =>
      (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>
        formDispatch({ [type]: e.target.value })

  const [diary, setDiary] = useAtom(diaryPage)
  const options = useAtomValue(emotionsOptions)
  const page = diary.filter((page) => String(page.id) === id)[0]


  const isEditing = params.id !== 'new-page'
  const color = isEditing ? options.filter(emotion => emotion.id === page.emotionID)[0].emotion : ''

  useEffect(() => {
    if (isEditing) {
      formDispatch({ title: page.title })
      formDispatch({ emotionID: page.emotionID })
      formDispatch({ text: page.text })
      formDispatch({ date: page.date.split('T')[0] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const parsedFields = journalSchema.safeParse(form)


      if (!parsedFields.success) {
        const fieldErrors = parsedFields.error.formErrors.fieldErrors
        const errorArray: readonly string[] = Object.keys(fieldErrors)
        toast.error(fieldErrors[errorArray.at(0) as keyof journalType]?.at(0))
        return
      }

      if (isEditing) {
        const entry = await axios.put<Idiary>(`../api/page/${id}`, form)

        const diaryObject = {
          title: entry.data.title,
          date: entry.data.date,
          emotionID: entry.data.emotionID,
          text: entry.data.text,
          id: entry.data.id
        }
        const diaryUpdated = diary.map(entry => {
          if (entry.id === diaryObject.id) {
            entry = diaryObject
          }
          return entry
        })
        setDiary(diaryUpdated)
      } else {
        const post = await axios.post('../api/page', form)
        setDiary(prev => [...prev, post.data])
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('A server error occurred, please try again')
        return
      }
      toast.error('An unexpected error occurred please try again')
    }

    router.push('./dashboard')
    return
  }

  return (
    <section className="w-full">
      <ToastContainer />
      <div className="pt-7 pl-10">
        <RetturnButton href="/dashboard" />
      </div>
      <section className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 border border-black rounded-md px-5 mx-14 md:mx-28 lg:mx-40  xl:mx-52 2xl:mx-64 py-5 mt-2 ">
        <form className="flex flex-col gap-6" onSubmit={submitPage}>
          <div className="flex items-center justify-between">
            <input
              className="bg-transparent focus:outline-none p-4 text-3xl w-full"
              placeholder="Give a title"
              autoFocus={true}
              value={form.title}
              onChange={inputHandle('title')}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex w-full gap-3 items-center">
              <AiOutlineCalendar className="w-6 h-6" />
              <input
                type="date"
                className="bg-transparent h-[40px] px-2 border-[1px] w-[176px] border-black  rounded-md focus:outline-none text-center"
                value={form.date}
                onChange={inputHandle('date')}
              />
            </div>
            <div className="flex w-full gap-3 items-center">
              <AiOutlineHeart className="w-6 h-6" />
              <EmotionInput
                formDispatch={formDispatch}
                value={color}
              />
            </div>
          </div>
          <hr />
          <textarea
            className="h-96 lg:h-[425px] xl:h-[450px] bg-transparent focus:outline-none p-3 text-lg placeholder:italic resize-none tracking-wide leading-relaxed sm:indent-5 scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400"
            placeholder="Start writing about your day"
            value={form.text}
            onChange={inputHandle('text')}
          />
          <div className="flex ">
            <button className="bg-green p-4 rounded-md">
              {isEditing ? 'Update the diary' : 'Insert in diary'}
            </button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default NovaPagina
