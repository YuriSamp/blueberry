'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAtom } from 'jotai'

import { DiarypageWritten } from '@components/card'
import CardSkeleton from '@components/cardSkeleton'
import { DiaryPopover } from '@components/diaryPopover'
import { MonthController } from '@components/monthController'
import { Navbar } from '@components/navbar'
import { Select } from '@components/ui/select'
import { ITags } from '@lib/validations/diary'

import { diaryPage } from 'src/context/diaryContext'
import { emotionsOptions } from 'src/context/emotionsOptions'
import { dateCalendarConvert } from 'src/helpers/dateHelpers'
import { Idiary } from '@lib/validations/diary'
import { firstTimeLoading } from 'src/context/loading'

interface IMonthComponent {
  diary: Idiary[] | null | undefined
  isLoading: boolean
}

const date = new Date()
const month = date.getMonth()

export default function Diario() {
  const [options, setOptions] = useAtom(emotionsOptions)

  const [monthIndex, setMonthIndex] = useState(month)
  const [year, setYear] = useState(date.getFullYear())
  const [emotionSelected, setEmotionSelected] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  const [diary, setDiary] = useAtom(diaryPage)
  const [isfirstTime, setFirstTime] = useAtom(firstTimeLoading)
  const [diaryRef, setdiaryRef] = useState<Idiary[]>([])

  const diarioFiltrado = (diario: Idiary[], filtro: string) => {
    if (filtro === 'All') {
      return diario
    }
    const filtroid = options.filter(emotion => emotion.emotion === filtro)[0].id
    return diario.filter((item) => item.emotionID === filtroid)
  }

  const diaryMonthFilter = (diary: Idiary[]) => {
    const compareDate = dateCalendarConvert(year, monthIndex + 1)
    const diaryPerMonth = diary.filter((item) =>
      item.date.slice(0, 7).includes(compareDate)
    )
    const diaryPerMonthSorted = diaryPerMonth.sort(
      (a, b) => Number(b.date.slice(-2)) - Number(a.date.slice(-2))
    )
    return diaryPerMonthSorted
  }

  useEffect(() => {
    const getPages = async () => {
      setIsLoading(true)
      try {
        const pages = await axios.get<Idiary[]>('../api/page')
        const tags = await axios.get<ITags[]>('../api/tags')
        setOptions(tags.data)
        setDiary(pages.data)
        setdiaryRef(diaryMonthFilter(pages.data))
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    if (!isfirstTime) {
      getPages()
      setFirstTime(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setdiaryRef(diaryMonthFilter(diary))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthIndex, diary, year])

  const selectOptions = () => {
    const optionsName = options?.map((item) => item.emotion)
    optionsName.unshift('All')
    return optionsName
  }

  return (
    <>
      <Navbar />
      <section className="pt-10 px-10">
        <div className="flex justify-center items-center">
          <div className="dashboardArea lg:dashboard-area-lg">
            <div className="button">
              <DiaryPopover />
            </div>
            <div className="controller">
              <MonthController
                monthIndex={monthIndex}
                year={year}
                setYear={setYear}
                setMonthIndex={setMonthIndex}
              />
            </div>
            <div className="button2 ">
              <div className="relative">
                <Select
                  Options={selectOptions()}
                  onChange={setEmotionSelected}
                  value={emotionSelected}
                  background="white"
                />
                <span className="after:rounded-lg after:top-2 after:left-2 after:right-[-5px] after:bottom-[-5px] after:-z-10 after:absolute after:bg-black"></span>
              </div>
            </div>
          </div>
        </div>
        <MonthComponent
          diary={diarioFiltrado(diaryRef, emotionSelected)}
          isLoading={isLoading}
        />
      </section>
    </>
  )
}

const MonthComponent = ({ diary, isLoading }: IMonthComponent) => {
  const loadingSkeletons = new Array(13).fill('')

  return (
    <div>
      <hr className="mt-10 mb-5" />
      <div className="flex justify-center sm:justify-start flex-wrap gap-4 pt-4">
        <Link
          href="./dashboard/new-page"
          className="w-60 h-52 bg-white flex justify-center items-center brutalism-box brutalism-box-hover"
        >
          <p className="text-lg"> + Page </p>
        </Link>
        {isLoading ? (
          <>
            {loadingSkeletons.map((_, id) => (
              <CardSkeleton key={id} />
            ))}
          </>
        ) : (
          <>
            {diary?.map((entry) => (
              <DiarypageWritten
                text={entry.text}
                title={entry.title}
                date={entry.date}
                id={entry.id}
                key={entry.id}
                emotionID={entry.emotionID}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
