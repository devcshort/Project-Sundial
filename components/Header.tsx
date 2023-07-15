import { config } from '@/lib/config';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function Header() {
  const router = useRouter();

  return (
    <Container
      maxW="container.xl"
      as="main"
      pt={8}
      pb={8}
      pl={8}
      pr={8}
      position="relative"
    >
      <Stack>
        <Heading as="h1" size="xl">
          Project Sundial
        </Heading>
        <Text>
          An open source project for ongoing community-driven exploration.
        </Text>
        <Flex justify="space-between">
          <Flex as="nav" gap={2}>
            <Text>Menu</Text>
            <Divider orientation="vertical" borderColor="black" />
            <Link
              href="/"
              textDecor={router.asPath === '/' ? 'underline' : undefined}
            >
              Home
            </Link>
            <Link
              href="/archive"
              textDecor={router.asPath === '/archive' ? 'underline' : undefined}
            >
              Archive
            </Link>
          </Flex>

          <Flex gap={2}>
            <Text>Get social</Text>
            <Divider orientation="vertical" borderColor="black" />
            {config.socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferer"
                transition="filter 0.2s ease-in"
                _hover={{
                  filter: 'opacity(0.7)',
                }}
              >
                <link.icon size={24} />
              </Link>
            ))}
          </Flex>
        </Flex>
      </Stack>

      <Image
        src="/world_map.jpg"
        fill
        alt=""
        style={{ zIndex: -1 }}
        objectFit="cover"
      />

      <Box
        bg="linear-gradient(90deg, rgba(189, 226, 239, 1), rgba(255,255,255,0.4))"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={-1}
      />
    </Container>
  );
}
