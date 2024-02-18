import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
} from "../../graphql/category.server";

import { ICategory } from "../../graphql/interfaces/category";

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

export const CreateCategoryModal = () => {
  const [createCategoryMutation] = useMutation(createCategory, {
    refetchQueries: ["getCategories"],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameInput, setNameInput] = useState("");

  const handleCreateCategory = () => {
    createCategoryMutation({
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
          <ModalHeader>Crée une nouvelle catégorie</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nom de la catégorie</FormLabel>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateCategory} colorScheme="blue" mr={3}>
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

const AllCategories = () => {
  const { role } = useUser();

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<{
    Categories: ICategory[];
  }>(getCategories);

  const [handleDeleteCategoryMutation] = useMutation(deleteCategory);

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!categoriesLoading && categoriesData && categoriesData.Categories) {
      setCategories(categoriesData.Categories);
    }
  }, [categoriesLoading, categoriesData]);

  if (categoriesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (categoriesError) {
    console.log(categoriesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleDeleteCategory = async (catId: number) => {
    if (role === 1) {
      await handleDeleteCategoryMutation({
        variables: {
          deleteCategoryId: catId,
        },
      });
      window.location.reload();
    }
  };
  return (
    <div>
      <CreateCategoryModal />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Catégorie</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td>{category.name}</Td>
                <Td>
                  <Trash2
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDeleteCategory(category.id);
                    }}
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

export default AllCategories;
