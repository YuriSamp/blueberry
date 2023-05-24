import { RetturnButton } from '@components/retturnButton';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center">
      <div className="pt-5 pl-10 flex self-start">
        <RetturnButton href="./" />
      </div>
      <div className="h-[90vh] flex flex-col justify-center">
        {children}
      </div>
    </section>
  );

}
