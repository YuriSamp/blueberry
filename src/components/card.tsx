import { useRef } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { BsTrash } from 'react-icons/bs'

import { diaryPage } from 'src/context/diaryContext'
import useHover from 'src/hooks/useHover'
import { Idiary } from 'src/types/diaryTypes'
import axios from 'axios'

export function DiarypageWritten({
  date,
  text,
  id,
  title,
  color,
}: Idiary) {
  const [diary, setdiary] = useAtom(diaryPage)

  const formatedText = text.length > 140 ? text.slice(0, 140) + '...' : text
  const formatedTitle = title.length > 18 ? title.slice(0, 19) + '...' : title
  const displaydate = date.split('T')[0].split('-').reverse().join('/').slice(0, 5)

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const removeEntry = async () => {
    await axios.delete(`../api/page/pageId=${id}`)
    const diaryUpdated = diary.filter((entry) => entry.id !== id)
    setdiary(diaryUpdated)
  }

  return (
    <div
      ref={hoverRef}
      className="w-60 h-52 bg-white flex brutalism-box brutalism-box-hover"
    >
      <Link href={`./dashboard/page-${id}`}>
        <p className="text p-2 max-w-[240px] break-all"> {formatedText}</p>
        <div
          style={{ backgroundColor: color }}
          className="flex justify-between absolute bottom-0 left-0 py-2 w-full px-3 rounded-b-md"
        >
          <p>{formatedTitle}</p>
          <p>{displaydate}</p>
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
