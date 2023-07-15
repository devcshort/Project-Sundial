import { Header } from '@/components/Header';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { glob } from 'glob';
import Head from 'next/head';
import Image from 'next/image';
import path from 'path';

type Props = {
  images: string[];
  metaFiles: string[];
};

const regex = /^(.*)(?=\d{4}\/\d{1,2}\/\d{2})/;
export async function getStaticProps() {
  const today = dayjs();
  const imagePath = path.resolve('./public/archive');
  const pathForToday = `${today.year()}/${today.month() + 1}/${today.date()}`;

  const images = await glob(`${imagePath}/${pathForToday}/*`, {
    ignore: {
      ignored: (p) => /\.meta.json$/.test(p.name),
    },
  });

  const metaFiles = await glob(`${imagePath}/${pathForToday}/*.meta.json`);

  return {
    props: {
      images: images.map((image: string) => image.replace(regex, '')),
      metaFiles: metaFiles.map((metaFile: string) =>
        metaFile.replace(regex, '')
      ),
    },
  };
}

export default function Home({ images, metaFiles }: Props) {
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

      <Container maxW="container.xl" as="main" pt={8} pb={8} pl={8} pr={8}>
        {images.map((image) => (
          <Image
            key={image}
            src={`/archive/${image}`}
            alt=""
            width={200}
            height={600}
          />
        ))}
      </Container>
    </>
  );
}
