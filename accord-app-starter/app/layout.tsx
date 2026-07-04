import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accord — Transaction Intelligence',
  description: 'AI transaction intelligence platform for real estate professionals.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
