import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, useDisclosure } from "@chakra-ui/react";
import roomMapImage from "./room_map.png";

const MapPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = () => {
    onOpen();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Button variant="outline" onClick={openModal}>
        Open Map
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent alignItems="center" justifyContent="center" backgroundColor="white" padding="20px" maxW="90%" maxH="90%" overflow="scroll">
          <ModalHeader>Room Map</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={roomMapImage} alt="Room Map" objectFit="contain" w="100%" h="100%" />
            {/* Add markers or overlays to represent the computers */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MapPopup;
