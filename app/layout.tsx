import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOLVE CEO Dashboard',
  description: 'A production-ready Next.js application with Supabase integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  );
}
