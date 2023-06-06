import { VariantProps, cva } from 'class-variance-authority'

const ButtonStyles = cva(
  'border-[1px] border-[#2A292B] w-36 h-12 brutalism-box ',
  {
    variants: {
      intent: {
        primary: 'bg-white brutalism-box-hover cursor-pointer ',
        danger:
          'bg-[#B3202C] border-none text-white brutalism-box-hover cursor-pointer ',
        success:
          'bg-green rounded-lg border-none text-white brutalism-box-hover cursor-pointer ',
        disable: 'bg-white hover:cursor-not-allowed',
      },
      Width: {
        sm: 'w-4',
        md: 'w-36 h-12',
        full: 'w-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
)

interface IButton extends VariantProps<typeof ButtonStyles> {
  Children: string
  onClick?: any
  disable?: boolean
  title?: string
}

export function Button({
  Width,
  intent,
  Children,
  onClick,
  disable,
  title,
}: IButton) {
  return (
    <button
      className={ButtonStyles({ Width, intent })}
      onClick={onClick}
      disabled={disable}
      title={title}
    >
      {Children}
    </button>
  )
}
