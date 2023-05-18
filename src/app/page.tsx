import Image from 'next/image'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="flex px-80 py-5 items-center justify-between w-full">
        <div className="text-4xl flex items-center gap-2">
          <BookOpen className="w-7 h-7" />
          <h2>Blueberry</h2>
        </div>
        <nav className="text-xl text-black flex gap-6">
          <Link href="/auth" className="px-3 py-2 brutalism-box">
            Log In
          </Link>
          <Link href="./auth/signup" className="px-3 py-2 brutalism-box">
            Sign Up
          </Link>
        </nav>
      </header>
      <Image
        alt="girl on computer"
        src="https://illustrations.popsy.co/amber/work-from-home.svg"
        width={400}
        height={500}
      />
      <div className="py-10">
        <p className="text-6xl flex flex-col gap-2 text-center font-medium">
          <h1>
            The best online <span className="text-emerald-500"> diary </span>{' '}
            app
          </h1>
          <h1>
            <span className="text-teal-500">made</span> by the{' '}
            <span className="text-red-400"> comunnity</span>
          </h1>
          <h1>
            <span className="text-yellow-500">for</span> the comunnity
          </h1>
        </p>
      </div>
      <footer className="text-xl pt-32">
        Code by{' '}
        <Link
          href="https://github.com/YuriSamp"
          target="_blank"
          className="underline"
        >
          Yuri
        </Link>
        , illustration by{' '}
        <Link
          href="https://popsy.co/illustrations"
          target="_blank"
          className="underline"
        >
          Popsy
        </Link>
        , Deploy on{' '}
        <Link
          href="https://vercel.com/dashboard"
          target="_blank"
          className="underline"
        >
          Vercel
        </Link>
      </footer>
    </main>
  )
}
