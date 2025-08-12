import type { Metadata } from 'next';
import { Bricolage } from '@/utils/fonts';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/lib/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://meoww.abdullahtech.dev'),
  title: 'Meoww - Talk with your loved ones',
  icons: {
    icon: '/cat.webp',
  },
  description: 'Application to talk with cats with some minimum set of convos',

  keywords: [
    'Cats',
    'Cat voices',
    'Catsvoice',
    'cat voices',
    'Meoww App',
    'Meoww Website',
    'Cat website',
    'Animal Voices',
    'Pss-Pss-Pss',
    'All about cat',
    'cute cats voices',
    'voices of animals',
    'cat and talk',
    'cats are adorable',
    'cats for the president',
    'cats are the best',
  ],
  authors: {
    url: 'https://github.com/abhub23',
    name: 'Abdullah Mukri',
  },
  publisher: 'Abdullah Mukri',

  twitter: {
    card: 'summary_large_image',
    site: '@abdullah_twt23',
    creator: '@abdullah_twt23',
    title: 'abdullah_twt23',
    description: 'Talk with your Cat',
    images: {
      url: 'https://abdullahtech.dev/og-image.png',
      type: 'image/png',
    },
  },

  appLinks: {
    web: {
      url: new URL('https://meoww.abdullahtech.dev'),
    },
  },

  category: 'Animal Audios',
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
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
