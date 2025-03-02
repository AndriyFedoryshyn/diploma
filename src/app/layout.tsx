import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import { LayoutClientWrapper, Wrapper, Footer } from '@/index';

import { UIControlsProvider } from '@/context/FontSizeContext/FontSizeProvider';

import '@/styles/main/main.scss';

const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Графік відключення електроенергії у Львівській області',
  description: 'Додаток Відключення Електроенергії у Львівській області',
  icons: '/icons/energy_logo.svg',
  authors: { name: 'Andriy Fedoryshyn' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={robotoFont.className}>
        <LayoutClientWrapper>
          <UIControlsProvider>
            <Wrapper>
              <>{children}</>
              <Footer />
            </Wrapper>
          </UIControlsProvider>
        </LayoutClientWrapper>
      </body>
    </html>
  );
}
