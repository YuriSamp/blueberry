'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useAtomValue } from 'jotai'

import DiarypageWritten from '@ui/diario/card'
import { DiaryPopover } from '@ui/diario/diaryPopover'
import { MonthController } from '@ui/monthController'
import { Navbar } from '@ui/navbar'
import { Select } from '@ui/select'

import { diaryPage } from 'src/context/diaryContext'
import { emotionsOptions } from 'src/context/emotionsOptions'
import { dateCalendarConvert } from 'src/helpers/dateHelpers'
import { Idiary } from 'src/types/diaryTypes'

interface IMonthComponent {
  diary: Idiary[]
}

const date = new Date()
const month = date.getMonth()

export default function Diario() {
  const options = useAtomValue(emotionsOptions)

  const selectOptions = useMemo(() => {
    const optionsName = options.map((item) => item.name)
    optionsName.unshift('Todas')
    return optionsName
  }, [options])

  const [monthIndex, setMonthIndex] = useState(month)
  const [year, setYear] = useState(date.getFullYear())
  const diary = useAtomValue(diaryPage)
  const [diaryRef, setdiaryRef] = useState(diary)
  const [emotionSelected, setEmotionSelected] = useState('Todas')

  const diarioFiltrado = (diario: Idiary[], filtro: string) => {
    if (filtro === 'Todas') {
      return diario
    }
    return diario.filter((item) => item.feeling === filtro)
  }

  useEffect(() => {
    const compareDate = dateCalendarConvert(year, monthIndex + 1)
    const diaryPerMonth = diary.filter((item) =>
      item.data.slice(0, 7).includes(compareDate)
    )
    const diaryPerMonthSorted = diaryPerMonth.sort(
      (a, b) => Number(b.data.slice(-2)) - Number(a.data.slice(-2))
    )
    setdiaryRef(diaryPerMonthSorted)
  }, [monthIndex, diary, year])

  useEffect(() => {
    setdiaryRef(diary)
  }, [diary])

  return (
    <>
      <Navbar />
      <section className="pt-10 px-10">
        <div className='flex justify-center items-center'>
          <div className="dashboardArea lg:dashboard-area-lg">
            <div className="button">
              <DiaryPopover />
            </div>
            <div className='controller'>
              <MonthController
                monthIndex={monthIndex}
                year={year}
                setYear={setYear}
                setMonthIndex={setMonthIndex}
              />
            </div>
            <div className="button2">
              <Select
                Options={selectOptions}
                onChange={setEmotionSelected}
                value={emotionSelected}
              />
            </div>
          </div>
        </div>
        <MonthComponent diary={diarioFiltrado(diaryRef, emotionSelected)} />
      </section>
    </>
  )
}

const MonthComponent = ({ diary }: IMonthComponent) => {
  return (
    <div>
      <hr className="mt-10 mb-5" />
      <div className="flex justify-center sm:justify-start flex-wrap gap-4 pt-4">
        <Link
          href="/dashboard/page"
          className="w-60 h-52 bg-white  flex justify-center items-center brutalism-box brutalism-box-hover"
        >
          <p className="text-lg"> + Entrada </p>
        </Link>
        {diary.map((entry) => (
          <DiarypageWritten
            text={entry.text}
            title={entry.title}
            data={entry.data}
            feeling={entry.feeling}
            id={entry.id}
            color={entry.color}
            key={entry.id}
          />
        ))}
      </div>
    </div>
  )
}
