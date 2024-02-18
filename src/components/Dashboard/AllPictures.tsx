import React, { useEffect, useState } from "react";

import { useQuery, useMutation } from "@apollo/client";

import { getPictures, uploadPicture } from "../../graphql/picture.server";

import { IPicture } from "../../graphql/interfaces/picture";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
} from "@chakra-ui/react";
import { Trash2, PencilLine } from "lucide-react";

import { useUser } from "../../context/UserContext";

import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { getPOIS } from "../../graphql/pointOfInterest.server";

export const CreatePictureModal = () => {
  const [uploadPictureMutation] = useMutation(uploadPicture, {
    refetchQueries: ["getPictures"],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [urlInput, setUrlInput] = useState<string>("");
  const [poiInput, setPoiInput] = useState<string>("");

  const {
    loading: poisLoading,
    error: poisError,
    data: poisData,
  } = useQuery<{
    PointOfinterests: IPointOfInterest[];
  }>(getPOIS);

  const [pointsOfInterests, setPointsOfInterests] = useState<
    IPointOfInterest[]
  >([]);

  useEffect(() => {
    if (!poisLoading && poisData && poisData.PointOfinterests) {
      setPointsOfInterests(poisData.PointOfinterests);
    }
  }, [poisLoading, poisData]);

  if (poisLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="30px" />;
  }

  if (poisError) {
    console.log(poisError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleUploadPicture = () => {
    uploadPictureMutation({
      variables: {
        data: {
          url: urlInput,
          pointOfInterestId: parseFloat(poiInput),
        },
      },
    });
    setUrlInput("");
  };

  const closeModal = () => {
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Button onClick={onOpen}>Ajouter</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Categorie</FormLabel>
              <Select
                value={poiInput}
                onChange={(e) => setPoiInput(e.target.value)}
                placeholder="Choisissez son point d'interêt"
              >
                {pointsOfInterests.map((pointOfInterest) => (
                  <option key={pointOfInterest.id} value={pointOfInterest.id}>
                    {pointOfInterest.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUploadPicture} colorScheme="blue" mr={3}>
              Envoyer
            </Button>
            <Button onClick={closeModal}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const AllPictures = () => {
  const { role } = useUser();

  const {
    loading: picturesLoading,
    error: picturesError,
    data: picturesData,
  } = useQuery<{
    Pictures: IPicture[];
  }>(getPictures);

  const [pictures, setPictures] = useState<IPicture[]>([]);

  useEffect(() => {
    if (!picturesLoading && picturesData && picturesData.Pictures) {
      setPictures(picturesData.Pictures);
    }
  }, [picturesLoading, picturesData]);

  if (picturesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (picturesError) {
    console.log(picturesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div>
      <CreatePictureModal />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Point d'intéret</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pictures.map((picture) => (
              <Tr key={picture?.id}>
                <Td>
                  <Image
                    boxSize="150px"
                    objectFit="cover"
                    src={picture?.url}
                    alt={picture?.pointOfInterest?.name}
                  />
                </Td>
                <Td>{picture?.pointOfInterest?.name}</Td>
                <Td>
                  {/* <Trash2
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDeleteCategory(category.id);
                    }}
                  /> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllPictures;
