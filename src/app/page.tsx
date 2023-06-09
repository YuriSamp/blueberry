import Image from 'next/image'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="flex px-12 sm:px-24 md:px-34 lg:px-52 xl:px-80 py-5 items-center justify-between w-full">
        <div className="text-4xl flex items-center gap-2">
          <BookOpen className="w-9 h-9" />
          <h2 className="hidden sm:flex">Blueberry</h2>
        </div>
        <nav className="text-xl text-black flex gap-6">
          <Link
            href="/sign-in"
            className="px-3 py-2 brutalism-box brutalism-box-hover bg-white"
          >
            Sign In
          </Link>
          <Link
            href="./sign-up"
            className="px-3 py-2 brutalism-box brutalism-box-hover bg-white"
          >
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
        <h1 className="text-6xl flex flex-col gap-2 text-center font-medium">
          <span>
            The best online <span className="text-emerald-500"> journal </span>{' '}
            app
          </span>
          <span>
            <span className="text-teal-500">made</span> by the{' '}
            <span className="text-red-400"> comunnity</span>
          </span>
          <span>
            <span className="text-yellow-500">for</span> the comunnity
          </span>
        </h1>
      </div>
      <footer className="text-center text-xl pt-32 pb-5 sm:pb-0 px-5">
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
