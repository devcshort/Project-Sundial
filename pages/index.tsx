import { Header } from '@/components/Header';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Sundial</title>
        <meta
          name="description"
          content="An open source project for ongoing community-driven exploration."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </>
  );
}
