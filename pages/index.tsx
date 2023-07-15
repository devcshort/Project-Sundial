import { Header } from '@/components/Header';
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { readJSON } from 'fs-extra';
import { glob } from 'glob';
import Head from 'next/head';
import Image from 'next/image';
import path from 'path';

type Props = {
  images: string[];
  metaFiles: string[];
};

const leadingPath = /^(.*)(?=\d{4}\/\d{1,2}\/\d{2})/;
const leadingPathWithDate = /^(.*)(\/\d{4}\/\d{1,2}\/\d{1,2}\/)/;
export async function getStaticProps() {
  const today = dayjs();
  const imagePath = path.resolve('./public/archive');
  const pathForToday = `${today.year()}/${today.month() + 1}/${today.date()}`;

  const imageFiles = await glob(`${imagePath}/${pathForToday}/*`, {
    ignore: {
      ignored: (p) => /\.meta.json$/.test(p.name),
    },
  });

  const metaFiles = await glob(`${imagePath}/${pathForToday}/*.meta.json`);

  const metaHashes: any = {};
  for (const file of metaFiles) {
    const meta = await readJSON(file);
    metaHashes[
      file.replace(leadingPathWithDate, '').replace('.meta.json', '')
    ] = meta;
  }

  const images = imageFiles.map((image: string) => ({
    src: image.replace(leadingPath, ''),
    meta: metaHashes[
      image.replace(leadingPathWithDate, '').replace('.jpg', '')
    ],
  }));

  console.log(images);

  return {
    props: {
      images,
    },
  };
}

export default function Home({ images }: Props) {
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

      <Container maxW="container.xl" as="main" p={4}>
        <SimpleGrid columns={4} spacing={4}>
          {images.map((image: any) => (
            <Card key={image.src}>
              <CardBody>
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={`/archive/${image.src}`}
                    alt={`Photo of the sun from ${image.meta.city}, ${image.meta.state} ${image.meta.country}`}
                    width={200}
                    height={600}
                  />
                </AspectRatio>
                <Stack mt="6" spacing="3">
                  <Flex alignItems="center" gap={2}>
                    <Image
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${image.meta.country}.svg`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <Heading size="md">
                      {image.meta.city}, {image.meta.state} {image.meta.country}
                    </Heading>
                  </Flex>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <HStack justify="space-between" spacing="2" w="100%">
                  <Text>{dayjs(image.meta.date).format('MM/DD/YYYY')}</Text>
                  <Text>{image.meta.time}</Text>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
