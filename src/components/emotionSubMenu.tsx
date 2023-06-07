import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import { ITags } from '@lib/validations/diary'

import { colors } from 'src/context/emotionsOptions'
import { useClickOutside } from 'src/hooks/useClickOutside'
import { SetAtom } from '@lib/validations/diary'

interface ISubMenu {
  setSubModalIsOpen: Dispatch<SetStateAction<boolean>>
  yCoordinates: number
  xCoordinates: number
  emotion: string
  setEmotion: Dispatch<SetStateAction<string>>
  options: ITags[]
  setOption: SetAtom<[SetStateAction<ITags[]>], void>
  setOptionsState: Dispatch<React.SetStateAction<ITags[]>>
  itemId: string
  defaultColor: string
}

export const SubMenu = ({
  setSubModalIsOpen,
  xCoordinates,
  yCoordinates,
  emotion,
  setEmotion,
  options,
  itemId,
  setOption,
  setOptionsState,
  defaultColor,
}: ISubMenu) => {
  const [colorSelected, setColorSelected] = useState(defaultColor)
  const domRef = useClickOutside(() => setSubModalIsOpen(false))

  const deleteItem = async () => {
    await axios.delete(`../api/tags/${itemId}`)
    const optionsEdited = options.filter((item) => item.id != itemId)
    setOption(optionsEdited)
    setOptionsState(optionsEdited)
  }

  const optionsEdited = options.map((item) => {
    if (item.id === itemId) {
      item.emotion = emotion
    }
    return item
  })

  const changeColor = async (color: string) => {
    const optionWithNewColor = options.map((item) => {
      if (item.id === itemId) {
        item.color = color
      }
      return item
    })
    setOption(optionWithNewColor)
    const teste = await axios.put(`../api/tags/${itemId}`, {
      emotion: emotion,
      color: color,
    })
  }

  useEffect(() => {
    setOption(optionsEdited)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emotion])

  return (
    <menu
      style={{
        transform: `translate(${xCoordinates + 'px'}, ${yCoordinates + 'px'})`,
      }}
      className=" bg-white  shadow-2xl  z-20 px-5 relative w-44 sm:w-64"
      ref={domRef}
    >
      <section className="pt-4 flex flex-col">
        <input
          className="bg-[rgb(243,239,239)] border px-2 py-1 focus:outline-none"
          autoFocus={true}
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
        />
        <div className="py-3 ">
          <button
            type="button"
            className="flex gap-2 w-full items-center pl-1 py-1 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              deleteItem()
              setSubModalIsOpen(false)
            }}
          >
            <BsTrash className="w-4 h-4" />
            <p>Deletar</p>
          </button>
        </div>
      </section>
      <p className="pb-3 text-lg">Colors</p>
      <ul className="flex flex-col gap-2 pb-2 max-h-[200px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400">
        {colors.map((item, index) => (
          <li className="hover:bg-gray-200  pr-3 " key={index}>
            <button
              type="button"
              className="flex justify-between items-center w-full cursor-pointer"
              onClick={() => {
                setColorSelected(item.color)
                changeColor(item.color)
              }}
            >
              <div className="flex gap-3 items-center">
                <div
                  style={{ backgroundColor: item.color }}
                  className={`h-5 w-5 rounded-md`}
                ></div>
                <p className="">{item.name}</p>
              </div>
              {colorSelected === item.color && <AiOutlineCheck />}
            </button>
          </li>
        ))}
      </ul>
    </menu>
  )
}
