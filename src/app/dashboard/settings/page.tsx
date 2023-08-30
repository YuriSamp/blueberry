'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { ToastContainer, toast } from 'react-toastify'

import { Fileinput } from '@components/fileinput'
import { RetturnButton } from '@components/retturnButton'
import SettingsAlert from '@components/settingsAlert'
import { SettingsContainer } from '@components/settingsContainer'
import Header from '@components/settingsHeader'
import { Button } from '@components/ui/button'
import { ControledInput } from '@components/ui/input'

export default function Perfil() {
  const [name, setName] = useState<string>('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [file, setFile] = useState<null | File>(null)

  const { user } = useUser()
  const router = useRouter()
  const { signOut } = useAuth()

  const updateUsername = async () => {
    await user?.update({
      username: name,
    }).catch((err) => {
      toast.error("Já existe um usuário com esse nome")
    })

  }

  const updatePhoto = async () => {
    await user?.setProfileImage({
      file: file,
    }).catch((err) => {
      toast.error("Ocorreu um erro ao fazer o upload da foto, tente novamente mais tarde")
    })
  }

  const onSizeError = () => toast.error('Tamanho excede o limite de 5mb')
  const onTypeError = () => toast.error('Tipo de arquivo não suportado')

  return (
    <>
      <ToastContainer />
      <div className="pt-5 pl-10 flex self-start">
        <RetturnButton href="/dashboard" text="" />
      </div>
      <section className="px-10 sm:px-20 lg:px-40 2xl:px-96 pt-16 ">
        <div className={`${alertOpen ? 'blur-sm' : ''}`}>
          <Header />
          <div className="sm:max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-slate-400 px-2">
            <SettingsContainer
              title="Name"
              firstChild={
                <ControledInput
                  type="text"
                  Width="lg"
                  placeholder="Insert your new nickname"
                  value={name}
                  onChange={setName}
                />
              }
            >
              <Button Children="Update" onClick={updateUsername} />
            </SettingsContainer>

            <SettingsContainer
              title="Photo"
              firstChild={
                <Fileinput
                  file={file}
                  setFile={setFile}
                  onSizeError={onSizeError}
                  onTypeError={onTypeError}
                />
              }
            >
              <Button Children="Update" onClick={updatePhoto} />
            </SettingsContainer>

            <SettingsContainer
              title="Email"
              firstChild="You will be redirect to another page to change your email address"
            >
              <Button
                Children="Update"
                onClick={() => router.push('/reset/email')}
              />
            </SettingsContainer>

            <SettingsContainer
              title="Password"
              firstChild="Choose a strong password, after all you dont want anyone to know your secrets"
            >
              <Button
                Children="Update"
                onClick={() => router.push('/reset/password')}
                disable={!user?.passwordEnabled}
                intent={!user?.passwordEnabled === true ? 'disable' : 'primary'}
                title="Caso esteja usando OAuth não existe a possibilidade de trocar de senha"
              />
            </SettingsContainer>

            <SettingsContainer
              title="Logout"
              firstChild="It will redirect you to the login page."
            >
              <Button
                Children="Logout"
                intent="danger"
                onClick={async () => {
                  await signOut()
                  router.push('./dashboard')
                }}
              />
            </SettingsContainer>
            <SettingsContainer
              title="Delete Account"
              firstChild={`It s a shame you re leaving 😭`}
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
