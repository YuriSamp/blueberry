import React from 'react'

import AvatarIcon from '@components/avatar'

export default function Header() {
  return (
    <>
      <section className="pt-10 pb-2 border-b-2 border-gray-800">
        <div className="flex items-center sm:items-start">
          <div className="pl-6">
            <AvatarIcon Width="lg" userPhoto={''} />
          </div>
          <div className="flex flex-col pl-8 sm:pt-3">
            <p className="text-3xl">Teste</p>
            <p>Teste@gmail.com</p>
          </div>
        </div>
      </section>
    </>
  )
}
