import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Editorial Hero Prototype',
  description: 'Editorial Hero Prototype',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
