'use client'

import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { AvatarWithDropDown } from '@components/avatarDropdown'

import breadcrumbs from 'src/helpers/breadcumbs'
import { greetings } from 'src/helpers/grettings'

export const Navbar = () => {
  const pathname = usePathname()
  const formatedPathname = breadcrumbs(pathname)
  const msg = greetings()
  const { user } = useUser()

  return (
    <header>
      <section className="flex py-4 px-8 z-20 relative bg-[#f9f5f2] drop-shadow-lg  w-full justify-between items-center ">
        <p>{formatedPathname}</p>
        <div className="flex gap-6 items-center">
          <p>
            {msg}, {user?.username}
          </p>
          <AvatarWithDropDown Path={user?.profileImageUrl} />
        </div>
      </section>
    </header>
  )
}
