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
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

import { useUser } from "../../context/UserContext";

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
    window.location.reload();
  };
  return (
    <div>
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
