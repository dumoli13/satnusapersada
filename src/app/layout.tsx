import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Appbar from '../components/Appbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'title',
  description: 'descripton',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <Appbar />
      {children}
    </body>
  </html>
);

export default RootLayout;
