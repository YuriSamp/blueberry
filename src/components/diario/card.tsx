import { useRef } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'

import { BsTrash } from 'react-icons/bs'
import { diaryPage } from 'src/context/diaryContext'
import useHover from 'src/hooks/useHover'
import { Idiary } from 'src/types/diaryTypes'

export default function DiarypageWritten({
  data,
  text,
  id,
  title,
  color,
}: Idiary) {
  const formatedText = text.length > 200 ? text.slice(0, 200) + '...' : text
  const formatedData = data.slice(-5).split('-').reverse()
  const formatedTitle = title.length > 18 ? title.slice(0, 19) + '...' : title
  const displayString = [formatedData[0], ' / ', formatedData[1]].concat()

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const [diary, setdiary] = useAtom(diaryPage)

  const removeEntry = () => {
    const diaryUpdated = diary.filter((entry) => entry.id !== id)
    setdiary(diaryUpdated)
  }

  return (
    <div ref={hoverRef} className="relative">
      <Link
        href={`./diario/pagina/${id}`}
        className="w-60 h-52 bg-CreamWhite 0 flex px-2 py-2 cursor-pointer select-none rounded-md drop-shadow-lg border-2"
      >
        <p className="text-sm p-1 max-w-[240px] break-all"> {formatedText}</p>
        <div
          style={{ backgroundColor: color }}
          className="flex justify-between absolute bottom-0 left-0 py-2 w-full px-3 rounded-b-md"
        >
          <p>{formatedTitle}</p>
          <p>{displayString}</p>
        </div>
      </Link>
      <div className={`${isHover ? 'flex' : 'hidden'}`}>
        <div
          style={{ backgroundColor: color }}
          className="absolute right-2 top-3  p-1 rounded-md cursor-pointer"
          onClick={() => removeEntry()}
        >
          <BsTrash />
        </div>
      </div>
    </div>
  )
}
