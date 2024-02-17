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
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

import { useUser } from "../../context/UserContext";

const AllCities = () => {
  const { role } = useUser();

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = useQuery<{
    Cities: ICity[];
  }>(getCities);

  const [cities, setCities] = useState<ICity[]>([]);

  const [handleDeleteCityMutation] = useMutation(deleteCity);

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
