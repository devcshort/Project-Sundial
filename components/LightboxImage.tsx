import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';
import { ReactNode } from 'react';

type Props = ImageProps & {
  modalTitle: ReactNode;
};

export function LightboxImage(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image {...props} alt={props.alt} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" justify="center">
              <Image {...props} alt={props.alt} width={300} height={900} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
