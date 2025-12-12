import type {Metadata} from 'next';
import Providers from '../providers';
import '@/app/styles';
import Link from 'next/link';
import {Button} from '@/shared/ui/Button';
import pretendard from '../fonts';

export const metadata: Metadata = {
  title: '에러 중앙화 데모',
  description: '에러 중앙화 데모 어플리케이션',
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${pretendard.className} antialiased flex flex-col w-full h-full`}>
        <header className="flex justify-center py-4 border-b">
          <nav className="flex items-center">
            <Button variant="link" className="text-xl" asChild>
              <Link href="/">읽기 요청 에러</Link>
            </Button>
            <Button variant="link" className="text-xl" asChild>
              <Link href="/write-error">쓰기 요청 에러</Link>
            </Button>
          </nav>
        </header>
        <Providers>
          <main className="grow w-full max-w-7xl mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
