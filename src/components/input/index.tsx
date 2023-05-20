import { Dispatch, SetStateAction } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

const inputStyles = cva(
  'py-2 px-2 rounded-lg border border-black bg-[#f9f5f2] focus:outline-none',
  {
    variants: {
      intent: {
        primary: '',
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
        xl2: 'text-2xl',
      },
    },
  }
)

interface Controled extends VariantProps<typeof inputStyles> {
  type: string
  placeholder: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
  id?: string
  label?: string
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
  label
}: Controled) {

  if (label) {
    return (
      <div className="flex flex-col gap-2 pt-4 relative">
        <label>{label}</label>
        <input
          className={inputStyles({ Width, intent, textSize })}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black' />
      </div>
    )
  }
  return (
    <div className="relative">
      <input
        className={inputStyles({ Width, intent, textSize })}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className='after:rounded-lg after:top-14 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black' />
    </div>
  )
}
