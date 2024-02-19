import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getCities,
  updateCity,
  createCity,
  deleteCity,
} from "../../graphql/city.server";

import { ICity } from "../../graphql/interfaces/city";

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
  ButtonGroup,
} from "@chakra-ui/react";
import { Trash2, PencilLine } from "lucide-react";

import { useUser } from "../../context/UserContext";

export const CreateCityModal = () => {
  const [createCityMutation] = useMutation(createCity, {
    refetchQueries: [getCities, "Cities"],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameInput, setNameInput] = useState("");

  const handleCreateCity = () => {
    createCityMutation({
      variables: {
        data: {
          name: nameInput,
        },
      },
    });
    setNameInput("");
  };

  return (
    <>
      <Button onClick={onOpen}>Ajouter</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crée une nouvelle ville</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom de la ville</FormLabel>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateCity} colorScheme="blue" mr={3}>
              Envoyer
            </Button>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const EditCityModal = ({ idCity }: { idCity: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateCityMutation] = useMutation(updateCity, {
    refetchQueries: [getCities, "Cities"],
  });
  const [editCityNameInput, setEditCityNameInput] = useState("");

  const handleUpdateCity = () => {
    updateCityMutation({
      variables: {
        updateCityId: idCity,
        data: {
          name: editCityNameInput,
        },
      },
    });

    setEditCityNameInput("");
  };

  return (
    <>
      <PencilLine style={{ cursor: "pointer" }} onClick={onOpen} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier cette ville</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nouveau nom de la ville</FormLabel>
              <Input
                value={editCityNameInput}
                onChange={(e) => setEditCityNameInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdateCity} colorScheme="blue" mr={3}>
              Envoyer
            </Button>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const AllCities = () => {
  const { role } = useUser();

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
    refetch: refetchCities,
  } = useQuery<{
    Cities: ICity[];
  }>(getCities);

  const [handleDeleteCityMutation] = useMutation(deleteCity);

  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (!citiesLoading && citiesData && citiesData.Cities) {
      setCities(citiesData.Cities);
    }
  }, [citiesLoading, citiesData]);

  if (citiesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (citiesError) {
    console.log(citiesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleDeleteCity = async (idCity: number) => {
    if (role === 1) {
      await handleDeleteCityMutation({
        variables: {
          deleteCityId: idCity,
        },
      });
      refetchCities();
    }
  };

  return (
    <div>
      <CreateCityModal />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Ville</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cities.length === 0 ? (
              <Tr>
                <Td colSpan={2}>Aucune ville. Ajoutez-en une.</Td>
              </Tr>
            ) : (
              cities.map((city) => (
                <Tr key={city.id}>
                  <Td>{city.name}</Td>
                  <Td>
                    <ButtonGroup gap="2">
                      <EditCityModal idCity={city.id} />
                      <Trash2
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteCity(city.id)}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllCities;
