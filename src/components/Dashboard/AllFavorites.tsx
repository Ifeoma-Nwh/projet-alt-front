import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";

import { getFavorites } from "../../graphql/users.server";
import { useUser } from "../../context/UserContext";
import {
  ButtonGroup,
  CircularProgress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";

const AllFavorites = () => {
  const { user } = useUser();

  const {
    loading: favoritesLoading,
    error: favoritesError,
    data: favoritesData,
    refetch: refetchFavorites,
  } = useQuery(getFavorites, {
    variables: {
      userId: user?.id,
    },
  });

  const [favorites, setFavorites] = useState<IPointOfInterest[]>([]);

  useEffect(() => {
    if (!favoritesLoading && favoritesData && favoritesData.findAllFavorites) {
      setFavorites(favoritesData.findAllFavorites);
      refetchFavorites();
    }
  }, [favoritesLoading, favoritesData, refetchFavorites]);

  if (favoritesLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (favoritesError) {
    console.log(favoritesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const handleRemoveFavorite = (favoriteId: number) => {
    console.log("first");
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nom du point d’interét</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {favorites.length === 0 ? (
              <Tr>
                <Td colSpan={2}>Aucun point d’interét favoris</Td>
              </Tr>
            ) : (
              favorites.map((favorite) => (
                <Tr key={favorite.id}>
                  <Td>{favorite.name}</Td>
                  <Td>
                    <Trash2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleRemoveFavorite(favorite.id);
                      }}
                    />
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

export default AllFavorites;
