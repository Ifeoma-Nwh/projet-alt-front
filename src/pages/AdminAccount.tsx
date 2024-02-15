import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getCities,
  getCity,
  createCity,
  deleteCity,
} from "../graphql/city.server";
import {
  getPOIS,
  getPOI,
  createPOI,
  deletePOI,
} from "../graphql/pointOfInterest.server";
import {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
} from "../graphql/category.server";
import { getUsers, findUser, deleteUser } from "../graphql/users.server";

import { IPointOfInterest } from "../graphql/interfaces/pointofinterest";
import { ICity } from "../graphql/interfaces/city";
import { ICategory } from "../graphql/interfaces/category";
import { IUser } from "../graphql/interfaces/user";

import { useUser } from "../context/UserContext";

import "../assets/styles/layouts/Account.scss";

const AdminAccount = () => {
  const {
    loading: poisLoading,
    error: poisError,
    data: poisData,
  } = useQuery<{
    PointOfinterests: IPointOfInterest[];
  }>(getPOIS);

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = useQuery<{
    Cities: ICity[];
  }>(getCities);

  // État pour stocker les points d'intérêt et les villes
  const [pointsOfInterest, setPointsOfInterest] = useState<IPointOfInterest[]>(
    []
  );
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (!poisLoading && poisData && poisData.PointOfinterests) {
      setPointsOfInterest(poisData.PointOfinterests);
    }
  }, [poisLoading, poisData]);

  useEffect(() => {
    if (!citiesLoading && citiesData && citiesData.Cities) {
      setCities(citiesData.Cities);
    }
  }, [citiesLoading, citiesData]);

  if (poisLoading || citiesLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (poisError || citiesError) {
    console.log(poisError);
    console.log(citiesError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return <div>Admin Account</div>;
};

export default AdminAccount;
