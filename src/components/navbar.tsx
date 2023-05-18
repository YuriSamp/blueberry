'use client'

import { usePathname } from 'next/navigation'

import { AvatarWithDropDown } from '@ui/avatarDropdown'

import breadcrumbs from 'src/helpers/breadcumbs'
import { greetings } from 'src/helpers/grettings'

export const Navbar = () => {
  const pathname = usePathname()
  const formatedPathname = breadcrumbs(pathname)
  // const [user] = useIdToken(auth);
  const msg = greetings()

  return (
    <header>
      <section className="flex py-4 px-8 z-20 relative bg-white drop-shadow-lg  w-full justify-between items-center ">
        <p>{formatedPathname}</p>
        <div className="flex gap-6 items-center">
          <p>{msg}, Teste</p>
          <AvatarWithDropDown Path={''} />
        </div>
      </section>
    </header>
  )
}
