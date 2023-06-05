'use client'
import { useAuth } from '@clerk/nextjs';
import useIdleTimeout from '@hooks/useIdleTimeout';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const idleTimeout = 60 * 30;

  const { signOut } = useAuth()
  const router = useRouter()


  const handleIdle = async () => {
    await signOut()
    router.push('./dashboard')
  }

  const { idleTimer } = useIdleTimeout({ onIdle: handleIdle, idleTime: idleTimeout })

  if (document.hidden) {
    idleTimer.start()
  }

  return (
    <>
      {children}
    </>
  );

}
