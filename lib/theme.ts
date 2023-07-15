import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
  },
  styles: {
    global: {
      body: {
        bg: '#ebe9f0',
      },
    },
  },
});
