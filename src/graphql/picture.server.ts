import { gql } from "@apollo/client";

export const getPictures = gql`
  query Pictures {
    pictures {
      id
      url
      pointOfInterest {
        id
        name
      }
    }
  }
`;

export const getPictureByPOIID = gql`
  query PictureByPOIId($pointOfInterestId: Float!) {
    pictureByPOIId(pointOfInterestId: $pointOfInterestId) {
      id
      url
    }
  }
`;

export const uploadPicture = gql`
  mutation UploadPicture($data: PictureInput!) {
    uploadPicture(data: $data) {
      id
      url
      pointOfInterestId
    }
  }
`;
