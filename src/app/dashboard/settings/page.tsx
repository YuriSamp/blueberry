'use client'

import { useState } from 'react'

import { Button } from '@ui/button'
import { ControledInput } from '@ui/input'

import 'react-toastify/dist/ReactToastify.css'
import RetturnButton from '@ui/retturnButton'
import SettingsAlert from '@ui/settings/settingsAlert'
import { SettingsContainer } from '@ui/settings/settingsContainer'
import Header from '@ui/settings/settingsHeader'
import { perfilContent } from 'src/translate/settings/perfil'
import { Select } from '@ui/select'


const SESSION_TIME = ['10 min', '15 min', '20 min', '30 min']

export default function Perfil() {
  const [photo, setPhoto] = useState<string>('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [sessionTime, setSessionTime] = useState('10 min')

  const {
    Container1,
    Container2,
    Container3,
    Container4,
    Container5,
    Container6,
    placeholders,
  } = perfilContent['pt-BR']

  const input = (type: 'name' | 'photo') => {
    return (
      <div className=" flex flex-col  gap-2 relative">
        <input
          type="text"
          placeholder={`${type === 'name' ? placeholders.nameInput : placeholders.photoInput}`}
          className="py-2 px-2 rounded-lg border border-black bg-[#f9f5f2]"
        />
        <span className='after:rounded-lg after:top-2 after:left-1 after:right-[-6px] after:bottom-1 after:-z-10 after:absolute after:bg-black'></span>
      </div>
      // <ControledInput
      //   type="text"
      //   Width="lg"
      //   intent={'primary'}
      //   placeholder={`${type === 'name' ? placeholders.nameInput : placeholders.photoInput
      //     }`}
      //   value={photo}
      //   onChange={setPhoto}
      // />
    )
  }

  return (
    <>
      <div className="pt-5 pl-10 flex self-start">
        <RetturnButton href="/dashboard" text="" />
      </div>
      <section className="px-10 sm:px-20 lg:px-40 2xl:px-96 pt-16">
        <div className={`${alertOpen ? 'blur-sm' : ''}`}>
          <Header />
          <div className="sm:max-h-[600px] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 px-2">
            <SettingsContainer
              title={Container1.title}
              firstChild={input('name')}
            >
              <Button
                Children={Container1.children}
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>

            <SettingsContainer
              title={Container2.title}
              firstChild={input('photo')}
            >
              <Button
                Children={Container2.children}
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>

            <SettingsContainer
              title={Container3.title}
              firstChild={'teste@gamil.com'}
            >
              <Button
                Children={Container3.children}
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>

            <SettingsContainer
              title={Container4.children}
              firstChild={Container4.firstChild}
            >
              <Button
                Children={Container4.children}
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>

            <SettingsContainer
              title='Tempo de sessão'
              firstChild='Regula o tempo de inatividade antes de sua conta ser desconectada automaticamente'
            >
              <div className='relative'>
                <Select
                  Options={SESSION_TIME}
                  onChange={setSessionTime}
                  value={sessionTime}
                />
                <span className='after:rounded-lg after:top-2 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black'></span>
              </div>
            </SettingsContainer>

            <SettingsContainer
              title={Container5.title}
              firstChild={Container5.firstChild}
            >
              <Button
                Children={Container5.children}
                intent="danger"
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>
            <SettingsContainer
              title={Container6.title}
              firstChild={`${Container6.firstChild} 😭`}
            >
              <SettingsAlert
                isAlertOpen={alertOpen}
                setIsAlertOpen={setAlertOpen}
              />
            </SettingsContainer>
          </div>
        </div>
      </section>
    </>
  )
}
