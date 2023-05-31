import { Dispatch } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { SetStateAction } from 'jotai'

import { UpperCaseFirstLetter } from 'src/helpers/uppercaseFirstLetter'

const selectStyles = cva(
  'w-36 h-12 text-center border-[1px] rounded-md border-[#2A292B] overflow-hidden',
  {
    variants: {
      Width: {
        sm: 'w-24 h-9',
        md: 'w-28 h-9',
        xmd: 'w-44 h-9',
        lg: 'w-36 h-12',
        full: 'w-full',
      },
      Height: {
        md: 'h-10',
      },
      rounded: {
        lg: 'rounded-lg',
      },
      background: {
        creamWhite: 'bg-creamWhite',
        white: 'bg-white',
      },
    },
  }
)

export interface ISelect extends VariantProps<typeof selectStyles> {
  Options: readonly string[]
  value: string | undefined
  onChange: Dispatch<SetStateAction<any>>
}

export function Select({
  Width,
  Options,
  onChange,
  value,
  Height,
  rounded,
}: ISelect) {
  return (
    <select
      className={selectStyles({ Width, Height, rounded })}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Options.map((item, index) => (
        <option
          value={item}
          key={index}
          className="dark:bg-InputGray min-w-[100px] max-w-[180px] overflow-ellipsis"
        >
          {UpperCaseFirstLetter(item)}
        </option>
      ))}
    </select>
  )
}
