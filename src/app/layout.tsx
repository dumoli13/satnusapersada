'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material';
import Appbar from '../components/Appbar';
import theme from '../lib/muiConfig/theme';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <ThemeProvider theme={theme}>
        <Appbar />
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
