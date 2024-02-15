import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getCities } from "../../graphql/city.server";
import { getPOIS } from "../../graphql/pointOfInterest.server";
import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { ICity } from "../../graphql/interfaces/city";

const PointsOfInterestByCity = () => {
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

  return (
    <div className="cities-section">
      <h1>Points d'intérêt par ville</h1>
      {cities?.map((city) => (
        <div key={city?.id}>
          <h2>{city?.name}</h2>
          <ul>
            {pointsOfInterest
              .filter((poi) => poi.city.id === city.id)
              .map((poi) => (
                <li key={poi?.id}>
                  <h3>{poi?.name}</h3>
                  <p>{poi?.description}</p>
                  {/* Affichez d'autres détails du point d'intérêt ici */}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PointsOfInterestByCity;
