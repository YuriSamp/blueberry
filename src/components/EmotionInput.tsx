import { Dispatch, useEffect, useState } from 'react'
import { SubMenu } from './emotionSubMenu'
import axios from 'axios'
import { useAtom } from 'jotai'
import { BsThreeDots } from 'react-icons/bs'

import { journalType } from '@lib/validations/diary'

import { colors, emotionsOptions } from 'src/context/emotionsOptions'
import { UpperCaseFirstLetter } from 'src/helpers/uppercaseFirstLetter'
import { useClickOutside } from 'src/hooks/useClickOutside'
import useMediaQuery from 'src/hooks/useMediaQuery'

interface InputWithSelectI {
  value: string
  formDispatch: Dispatch<Partial<journalType>>
}

export function EmotionInput({ value, formDispatch }: InputWithSelectI) {
  const [options, setoptions] = useAtom(emotionsOptions)

  const [focus, setFocus] = useState(false)
  const [inputSearch, setInputSearch] = useState(value)
  const [subModalIsOpen, setSubModalIsOpen] = useState(false)
  const [xCoordinates, setX] = useState(0)
  const [yCoordinates, setY] = useState(0)
  const domRef = useClickOutside(() => setFocus(false))

  const [optionsState, setOptionsState] = useState(options)
  const [itemId, setItemId] = useState('')
  const [defaultColor, setDefaultColor] = useState('')
  const [emotion, setEmotion] = useState('')

  useEffect(() => {
    if (inputSearch && inputSearch.length > 1) {
      setOptionsState(
        options.filter((item) =>
          item.emotion.toLowerCase().includes(inputSearch.trim().toLowerCase())
        )
      )
      formDispatch({ emotion: inputSearch })
    } else {
      setOptionsState(options)
      formDispatch({ emotion: inputSearch })
    }
  }, [inputSearch, options, formDispatch])

  useEffect(() => {
    if (value !== '') {
      options.map((option) => {
        if (option.emotion === value) {
          formDispatch({ color: option.color })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const matches = useMediaQuery('(min-width: 500px)')

  const setter = (name: string, id: string, color: string) => {
    setEmotion(name)
    setSubModalIsOpen(true)
    setX(matches ? 260 : 20)
    setY(-100)
    setItemId(id)
    setDefaultColor(color)
  }

  const newOption = async () => {
    const randomColor = colors
      .sort(() => 0.5 - Math.random())
      .slice(0, 1)
      .map((item) => item.color)

    const newEmotion = {
      emotion: inputSearch,
      id: String(options.length),
      color: randomColor[0],
    }

    await axios.post('../api/tags', {
      emotion: inputSearch,
      color: randomColor[0],
    })

    formDispatch({ color: randomColor[0] })
    setoptions((prev) => [...prev, newEmotion])
    setFocus(false)
  }

  return (
    <menu className="flex flex-col h-10" ref={domRef}>
      <input
        className="py-2 px-2 rounded-lg focus:outline-none bg-transparent border-[1px] border-black  h-10 w-44 text-center placeholder:text-sm"
        value={UpperCaseFirstLetter(value)}
        onChange={(e) => setInputSearch(e.target.value)}
        placeholder="Search an emotion"
        onFocus={() => setFocus(true)}
      />
      <section className="relative z-10 bg-white w-44 sm:w-64 shadow-2xl rounded-lg">
        {focus && (
          <>
            <p className="text-sm pt-4 px-4 pb-3">
              Select an option or create one
            </p>
            <div className="max-h-[160px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400">
              {optionsState.length > 0 ? (
                optionsState.map((item) => (
                  <div
                    className="hover:bg-gray-200 cursor-pointer"
                    key={item.id}
                  >
                    <div className="flex items-center py-1 px-4 ">
                      <button
                        type="button"
                        className="flex items-center w-full"
                        onClick={() => {
                          setInputSearch(item.emotion)
                          setFocus(false)
                          formDispatch({ color: item.color })
                        }}
                      >
                        <p
                          style={{ backgroundColor: item.color }}
                          className="px-2 py-1 bg-red-300 rounded-md min-w-[70px] flex justify-center"
                        >
                          {UpperCaseFirstLetter(item.emotion)}
                        </p>
                      </button>
                      <button
                        type="button"
                        className="hover:bg-gray-300  w-6 h-6 flex justify-center items-center"
                        onClick={() =>
                          setter(item.emotion, item.id, item.color)
                        }
                        onKeyDown={(e) =>
                          e.key == 'Enter' &&
                          setter(item.emotion, item.id, item.color)
                        }
                      >
                        <BsThreeDots />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <button
                  type="button"
                  className="hover:bg-gray-200 cursor-pointer w-full"
                  onClick={() => newOption()}
                >
                  <p className="flex gap-5 items-center py-1 px-4 ">
                    <span>Add</span>
                    <span>{inputSearch}</span>
                  </p>
                </button>
              )}
            </div>
          </>
        )}
      </section>
      {subModalIsOpen && (
        <SubMenu
          setSubModalIsOpen={setSubModalIsOpen}
          yCoordinates={yCoordinates}
          xCoordinates={xCoordinates}
          emotion={emotion}
          setEmotion={setEmotion}
          options={options}
          itemId={itemId}
          setOption={setoptions}
          setOptionsState={setOptionsState}
          defaultColor={defaultColor}
        />
      )}
    </menu>
  )
}
