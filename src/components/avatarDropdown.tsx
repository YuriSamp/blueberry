'use client'

import React from 'react'
import Link from 'next/link'
import AvatarIcon from './ui/avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ExitIcon } from '@radix-ui/react-icons'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const routes = [
  {
    name: 'Settings',
    link: '/dashboard/settings',
  },
]


type Props = {
  Path: string | undefined
}

export function AvatarWithDropDown({ Path }: Props) {

  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full h-9 w-9 "
          aria-label="Customise options"
        >
          <AvatarIcon Width="md" userPhoto={Path} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" absolute top-[20px] z-20 left-[-190px] min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="text-black text-base flex items-center px-6 outline-none select-none mb-1 ">
            <p className="italic">Blueberry</p>
          </DropdownMenu.Item>
          {routes.map((item, index) => (
            <DropdownMenu.Item
              className="text-sm text-black rounded flex items-center h-6 px-5 py-0 relative pl-6 select-none outline-none cursor-pointer hover:bg-violet-900 dark:hover:bg-gray-800 hover:text-white"
              key={index}
            >
              <Link href={item.link} className="w-full">
                {item.name}
              </Link>
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="h-[1px] m-1 bg-gray-800" />
          <DropdownMenu.Item className="text-sm text-black rounded flex items-center h-6 px-5 py-0 relative pl-6 select-none outline-none cursor-pointer hover:bg-violet-900 dark:hover:bg-gray-800 hover:text-white">
            <button
              className="flex gap-2"
              onClick={async () => {
                await signOut()
                router.push('./dashboard')
              }}
            >
              <ExitIcon />
              Sair da conta
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
