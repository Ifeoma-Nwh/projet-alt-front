import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getCities,
  getCity,
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
} from "@chakra-ui/react";
import { Trash2, PencilLine } from "lucide-react";

import { useUser } from "../../context/UserContext";

export const CreateCityModal = () => {
  const [createCityMutation] = useMutation(createCity, {
    refetchQueries: ["getCities"],
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
            <Button onClick={closeModal}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const EditCityModal = () => {};

const AllCities = () => {
  const { role } = useUser();

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
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
      window.location.reload();
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
            {cities.map((city) => (
              <Tr key={city.id}>
                <Td>{city.name}</Td>
                <Td>
                  <Trash2
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteCity(city.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllCities;
