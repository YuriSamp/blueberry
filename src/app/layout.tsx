import './styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

//TODO add metadata for every page
//TODO componentizar e deixar eles pro client, o resto pro server
//TODO use notFound() on diary

export const metadata = {
  title: 'Blueberry',
  description: 'The best diary app online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism
      }}
    >
      <html lang="pt-BR">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
