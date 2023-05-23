'use client'

import { useState } from 'react'

import { Button } from '@components/button'
import { ControledInput } from '@components/input'

import { RetturnButton } from '@components/retturnButton'
import { Select } from '@components/select'
import SettingsAlert from '@components/settingsAlert'
import { SettingsContainer } from '@components/settingsContainer'
import Header from '@components/settingsHeader'

import { perfilContent } from 'src/translate/settings/perfil'

const SESSION_TIME = ['10 min', '15 min', '20 min', '30 min']

export default function Perfil() {
  const [name, setName] = useState<string>('')
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
              firstChild={
                <ControledInput
                  type="text"
                  Width="lg"
                  placeholder={placeholders.nameInput}
                  value={name}
                  onChange={setName}
                />
              }
            >
              <Button
                Children={Container1.children}
                onClick={() => console.log('teste')}
              />
            </SettingsContainer>

            <SettingsContainer
              title={Container2.title}
              firstChild={
                <ControledInput
                  type="text"
                  Width="lg"
                  placeholder={placeholders.photoInput}
                  value={photo}
                  onChange={setPhoto}
                />
              }
            >
              <Button
                Children={Container2.children}
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
              title="Tempo de sessão"
              firstChild="Regula o tempo de inatividade antes de sua conta ser desconectada automaticamente"
            >
              <div className="relative">
                <Select
                  Options={SESSION_TIME}
                  onChange={setSessionTime}
                  value={sessionTime}
                  background="white"
                />
                <span className="after:rounded-lg after:top-2 after:left-1 after:right-[-6px] after:bottom-[-6px] after:-z-10 after:absolute after:bg-black"></span>
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
