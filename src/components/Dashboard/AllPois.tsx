import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getPOIS,
  createPOI,
  deletePOI,
  updatePOI,
} from "../../graphql/pointOfInterest.server";

import { getCategories } from "../../graphql/category.server";

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
  Textarea,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { Trash2, PencilLine } from "lucide-react";

import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { ICategory } from "../../graphql/interfaces/category";

import { useUser } from "../../context/UserContext";
import { getCities } from "../../graphql/city.server";
import { ICity } from "../../graphql/interfaces/city";

export const CreatePointOfInterestModal = () => {
  const [createPOIMutation] = useMutation(createPOI, {
    refetchQueries: [getPOIS],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameInput, setNameInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState<string>("");

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = useQuery<{
    Cities: ICity[];
  }>(getCities);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<{
    Categories: ICategory[];
  }>(getCategories);

  const [cities, setCities] = useState<ICity[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!citiesLoading && citiesData && citiesData.Cities) {
      setCities(citiesData.Cities);
    }
  }, [citiesLoading, citiesData]);

  useEffect(() => {
    if (!categoriesLoading && categoriesData && categoriesData.Categories) {
      setCategories(categoriesData.Categories);
    }
  }, [categoriesLoading, categoriesData]);

  if (citiesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="30px" />;
  }

  if (citiesError) {
    console.log(citiesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  if (categoriesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="30px" />;
  }

  if (categoriesError) {
    console.log(categoriesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleCreatePOI = () => {
    createPOIMutation({
      variables: {
        data: {
          name: nameInput,
          adress: addressInput,
          description: descriptionInput,
          cityId: parseFloat(cityInput),
        },
        categoryId: parseFloat(categoryInput),
      },
    });
    setNameInput("");
    setAddressInput("");
    setDescriptionInput("");
    setCityInput("");
    setCategoryInput("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityInput(e.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Ajouter</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crée une nouvelle point d'interet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom</FormLabel>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Adresse</FormLabel>
              <Input
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Ecrivez nous une description..."
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ville</FormLabel>
              <Select
                value={cityInput}
                onChange={handleCityChange}
                placeholder="Choisissez une ville"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Categorie</FormLabel>
              <Select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Choisissez une categorie"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreatePOI} colorScheme="blue" mr={3}>
              Envoyer
            </Button>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const EditPOIModal = ({ editPoi }: { editPoi: IPointOfInterest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameInput, setNameInput] = useState(editPoi.name);
  const [addressInput, setAddressInput] = useState(editPoi.adress);
  const [descriptionInput, setDescriptionInput] = useState(editPoi.description);
  const [cityInput, setCityInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const [updatePOIMutation] = useMutation(updatePOI, {
    refetchQueries: [getPOIS],
  });

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = useQuery<{
    Cities: ICity[];
  }>(getCities);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<{
    Categories: ICategory[];
  }>(getCategories);

  const [cities, setCities] = useState<ICity[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!citiesLoading && citiesData && citiesData.Cities) {
      setCities(citiesData.Cities);
    }
  }, [citiesLoading, citiesData]);

  useEffect(() => {
    if (!categoriesLoading && categoriesData && categoriesData.Categories) {
      setCategories(categoriesData.Categories);
    }
  }, [categoriesLoading, categoriesData]);

  if (citiesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="30px" />;
  }

  if (citiesError) {
    console.log(citiesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  if (categoriesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="30px" />;
  }

  if (categoriesError) {
    console.log(categoriesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleUpdatePOI = () => {
    updatePOIMutation({
      variables: {
        data: {
          name: nameInput,
          adress: addressInput,
          description: descriptionInput,
          cityId: parseFloat(cityInput),
        },
        updatePointOfInterestId: editPoi.id,
        categoryId: parseFloat(categoryInput),
      },
    });
    setNameInput(nameInput);
    setAddressInput(addressInput);
    setDescriptionInput(descriptionInput);
    setCityInput("");
    setCategoryInput("");
  };

  return (
    <>
      <PencilLine style={{ cursor: "pointer" }} onClick={onOpen} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier ce point d'interet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nouveau nom</FormLabel>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nouvelle adresse</FormLabel>
              <Input
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nouvelle description</FormLabel>
              <Textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Ecrivez nous une description..."
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nouveau ville</FormLabel>
              <Select
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Choisissez une ville"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Categorie</FormLabel>
              <Select
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Choisissez une categorie"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdatePOI} colorScheme="blue" mr={3}>
              Envoyer
            </Button>
            <Button onClick={onClose}>Fermer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const AllPois = () => {
  const { role } = useUser();

  const {
    loading: poisLoading,
    error: poisError,
    data: poisData,
    refetch: refetchPOIs,
  } = useQuery<{
    PointOfinterests: IPointOfInterest[];
  }>(getPOIS);

  const [handleDeletePOI] = useMutation(deletePOI);

  const [pointsOfInterests, setPointsOfInterests] = useState<
    IPointOfInterest[]
  >([]);

  useEffect(() => {
    if (!poisLoading && poisData && poisData.PointOfinterests) {
      setPointsOfInterests(poisData.PointOfinterests);
    }
  }, [poisLoading, poisData]);

  if (poisLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (poisError) {
    console.log(poisError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleDelete = async (poiId: number) => {
    if (role === 1) {
      await handleDeletePOI({
        variables: {
          deletePointOfInterestId: poiId,
        },
      });
      refetchPOIs();
    }
  };

  return (
    <div>
      <CreatePointOfInterestModal />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>Description</Th>
              <Th>Adresse</Th>
              <Th>Ville</Th>
              <Th>Catégories</Th>
              <Th>Date de création</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pointsOfInterests.length === 0 ? (
              <Tr>
                <Td colSpan={7}>Aucun point d'interet. Ajoutez-en un.</Td>
              </Tr>
            ) : (
              pointsOfInterests.map((pointOfInterest: IPointOfInterest) => (
                <Tr key={pointOfInterest.id}>
                  <Td>{pointOfInterest.name}</Td>
                  <Td>{pointOfInterest.description}</Td>
                  <Td>{pointOfInterest.adress}</Td>
                  <Td>{pointOfInterest.city.name}</Td>
                  <Td>
                    {pointOfInterest.categories?.map((category: ICategory) => (
                      <p key={category.id}>{category.name}</p>
                    ))}
                  </Td>
                  <Td>{pointOfInterest.created_at?.toLocaleString()}</Td>
                  <Td>
                    <ButtonGroup gap="2">
                      <EditPOIModal editPoi={pointOfInterest} />
                      <Trash2
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(pointOfInterest.id)}
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

export default AllPois;
