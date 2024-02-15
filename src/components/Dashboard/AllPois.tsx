import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getPOIS,
  getPOI,
  createPOI,
  deletePOI,
} from "../../graphql/pointOfInterest.server";

import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";

const AllPois = () => {
  const {
    loading: poisLoading,
    error: poisError,
    data: poisData,
  } = useQuery<{
    PointOfinterests: IPointOfInterest[];
  }>(getPOIS);

  const [pointsOfInterest, setPointsOfInterest] = useState<IPointOfInterest[]>(
    []
  );

  useEffect(() => {
    if (!poisLoading && poisData && poisData.PointOfinterests) {
      setPointsOfInterest(poisData.PointOfinterests);
    }
  }, [poisLoading, poisData]);
  return <div>AllPois</div>;
};

export default AllPois;
