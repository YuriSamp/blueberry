import Image from 'next/image'
import svg404 from '../../public/404.svg'

import RetturnButton from '@ui/retturnButton'

export default function NotFound() {
  return (
    <section className="min-h-screen bg-CreamWhite">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-3xl">
          {' '}
          Pelo visto essa página ainda não foi escrita
        </p>
        <Image
          src={svg404}
          alt="imagem de um computador com erro"
          width={600}
          height={600}
        />
        <div className="pt-6">
          <RetturnButton href="/dashboard" text="Voltar ao dashboard" />
        </div>
      </div>
    </section>
  )
}
