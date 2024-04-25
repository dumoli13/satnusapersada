'use client';

import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material';
import theme from '../lib/muiConfig/theme';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
