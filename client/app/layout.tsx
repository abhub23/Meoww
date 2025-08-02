import type { Metadata } from 'next';
import { Bricolage } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meoww - Talk with your loved ones',
  icons: {
    icon: '/cat.webp',
  },
  description: 'Application to talk with cats with some minimum set of convos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Bricolage}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
