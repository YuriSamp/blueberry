"use client"

import { AiOutlineCalendar, AiOutlineHome } from 'react-icons/ai';
import { TfiClose } from 'react-icons/tfi'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { BsBook, BsPencil } from 'react-icons/bs';
import { FiTarget } from 'react-icons/fi';
import Link from 'next/link';
import { UpperCaseFirstLetter } from 'src/helpers/uppercaseFirstLetter';
import { greetings } from 'src/helpers/grettings';
import { AvatarWithDropDown } from '@ui/avatarDropdown';

export const Navbar = () => {

  // const [user] = useIdToken(auth);
  const msg = greetings()

  return (
    <header>
      <section
        className='flex py-4 px-8 z-20 relative bg-white drop-shadow-lg  w-full justify-between items-center '>
        <p>PLACEHOLDER</p>
        <div className='flex gap-6 items-center'>
          <p >{msg}, Teste</p>
          <AvatarWithDropDown Path={''} />
        </div>
      </section>
    </header>
  )
}
