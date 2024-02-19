/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getCities } from "../../graphql/city.server";
import { getPOIS } from "../../graphql/pointOfInterest.server";
import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { ICity } from "../../graphql/interfaces/city";
import ImagePOI from "../../assets/images/poi-la-rochelle-marche.jpg";
import { Link } from "react-router-dom";

const Explorer = () => {
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
    <div className="container explorer-wrapper">
      <h1>Je veux vister...</h1>
      <div className="points-of-interest">
        {cities?.map((city) => (
          <div className="city-pois-wrapper" key={city?.id}>
            <h2>{city?.name.toUpperCase()}</h2>
            <div className="poi-wrapper">
              {pointsOfInterest.length === 0 ? (
                <p>Aucun points d'intêret pour le moment.</p>
              ) : (
                pointsOfInterest
                  ?.filter((poi) => poi?.city.id === city.id)
                  .map((poi) => (
                    <Link to={`/explore/${poi.id}`} key={poi.id}>
                      <div className="poi-card">
                        <img
                          className="poi-card__img"
                          src={ImagePOI}
                          alt="poi-image"
                        />
                        <div className="poi-card__title">
                          <p>{poi?.name}</p>
                        </div>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
