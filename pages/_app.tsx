import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';
import { theme } from '@/lib/theme';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
