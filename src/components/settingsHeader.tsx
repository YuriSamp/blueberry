'use client'

import React from 'react'

import AvatarIcon from '@components/ui/avatar'
import { useUser } from '@clerk/nextjs'


export default function Header() {

  const { user } = useUser()

  return (
    <>
      <section className="pt-10 pb-2 border-b-2 border-gray-800">
        <div className="flex items-center sm:items-start">
          <div className="pl-6">
            <AvatarIcon Width="lg" userPhoto={user?.profileImageUrl} />
          </div>
          <div className="flex flex-col pl-8 sm:pt-3">
            <p className="text-3xl">{user?.username}</p>
            <p>{user?.emailAddresses[0].emailAddress as string}</p>
          </div>
        </div>
      </section>
    </>
  )
}
