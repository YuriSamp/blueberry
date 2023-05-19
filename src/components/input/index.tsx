import { Dispatch, SetStateAction } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

const inputStyles = cva(
  'py-2 px-2 rounded-lg bg-[#f9f5f2] focus:outline-none',
  {
    variants: {
      intent: {
        primary: 'border border-black focus:border-blue-500',
      },
      Width: {
        sm: 'w-4',
        md: 'w-12',
        lg: 'w-60',
        full: 'w-full',
      },
      textSize: {
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        Dxl: 'text-2xl',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
)

interface Controled extends VariantProps<typeof inputStyles> {
  id?: string
  type: string
  placeholder: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

export function ControledInput({
  Width,
  intent,
  textSize,
  type,
  id,
  placeholder,
  value,
  onChange,
}: Controled) {
  return (
    <input
      className={inputStyles({ Width, intent, textSize })}
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  )
}
