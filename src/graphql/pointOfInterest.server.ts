import { gql } from "@apollo/client";

export const getPOIS = gql`
  query {
    PointOfinterests {
      id
      name
      adress
      description
      latitude
      longitude
      created_at
      updated_at
      createdBy {
        id
      }
      city {
        id
        name
        latitude
        longitude
      }
      comments {
        id
        comment
        note
      }
      categories {
        id
        name
      }
    }
  }
`;
export const getPOI = gql`
  query ($pointOfInterestId: ID!) {
    pointOfInterest(id: $pointOfInterestId) {
      id
      name
      adress
      description
      latitude
      longitude
      createdBy {
        id
      }
      city {
        id
        name
        latitude
        longitude
      }
      comments {
        id
        comment
        note
      }
      categories {
        id
        name
      }
    }
  }
`;
export const createPOI = gql`
  mutation ($categoryId: Float!, $data: PointOfInterestInput!) {
    createPointOfInterest(categoryId: $categoryId, data: $data) {
      id
      adress
      name
      description
      latitude
      longitude
      cityId
    }
  }
`;
export const deletePOI = gql`
  mutation ($deletePointOfInterestId: ID!) {
    deletePointOfInterest(id: $deletePointOfInterestId) {
      id
    }
  }
`;
export const deletePOIS = gql`
  mutation {
    deletePointOfinterests {
      id
    }
  }
`;
export const updatePOI = gql`
  mutation (
    $categoryId: Float!
    $data: PointOfInterestInput!
    $updatePointOfInterestId: ID!
  ) {
    updatePointOfInterest(
      categoryId: $categoryId
      data: $data
      id: $updatePointOfInterestId
    ) {
      name
      description
      adress
      cityId
    }
  }
`;
