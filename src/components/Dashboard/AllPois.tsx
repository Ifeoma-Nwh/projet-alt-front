import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getPOIS,
  getPOI,
  createPOI,
  deletePOI,
} from "../../graphql/pointOfInterest.server";

import { getPictures } from "../../graphql/picture.server";
import { getCategories } from "../../graphql/category.server";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { IPicture } from "../../graphql/interfaces/picture";
import { ICategory } from "../../graphql/interfaces/category";

import { useUser } from "../../context/UserContext";

const AllPois = () => {
  const { role } = useUser();

  const {
    loading: poisLoading,
    error: poisError,
    data: poisData,
  } = useQuery<{
    PointOfinterests: IPointOfInterest[];
  }>(getPOIS);

  const {
    loading: picturesLoading,
    error: picturesError,
    data: picturesData,
  } = useQuery<{
    Pictures: IPicture[];
  }>(getPictures);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery<{
    Categories: ICategory[];
  }>(getCategories);

  const [handleDeletePOI] = useMutation(deletePOI);

  const [pointsOfInterests, setPointsOfInterests] = useState<
    IPointOfInterest[]
  >([]);
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (!poisLoading && poisData && poisData.PointOfinterests) {
      setPointsOfInterests(poisData.PointOfinterests);
    }
  }, [poisLoading, poisData]);

  useEffect(() => {
    if (!picturesLoading && picturesData && picturesData.Pictures) {
      setPictures(picturesData.Pictures);
    }
  }, [picturesLoading, picturesData]);

  useEffect(() => {
    if (!categoriesLoading && categoriesData && categoriesData.Categories) {
      setCategories(categoriesData.Categories);
    }
  }, [categoriesLoading, categoriesData]);

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
      window.location.reload();
    }
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Nom</Th>
              <Th>Description</Th>
              <Th>Adresse</Th>
              <Th>Ville</Th>
              <Th>Images</Th>
              <Th>Catégories</Th>
              <Th>Date de création</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pointsOfInterests.map((pointOfInterest: IPointOfInterest) => (
              <Tr key={pointOfInterest.id}>
                <Td>{pointOfInterest.name}</Td>
                <Td>{pointOfInterest.description}</Td>
                <Td>{pointOfInterest.adress}</Td>
                <Td>{pointOfInterest.city.name}</Td>
                <Td>
                  {picturesError ? (
                    <p>Une erreur s'est produite</p>
                  ) : (
                    pictures
                      .filter(
                        (picture) =>
                          picture.pointOfInterest.id === pointOfInterest.id
                      )
                      .map((picture) => <p key={picture.id}>{picture.url}</p>)
                  )}
                </Td>
                <Td>
                  {pointOfInterest.categories?.map((category: ICategory) => (
                    <p key={category.id}>{category.name}</p>
                  ))}
                </Td>
                <Td>{pointOfInterest.created_at?.toLocaleString()}</Td>
                <Td>
                  <Trash2
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(pointOfInterest.id)}
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

export default AllPois;
