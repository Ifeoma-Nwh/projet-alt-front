import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import "../../assets/styles/layouts/PointOfInterest.scss";
import ImagePoi from "../../assets/images/poi-la-rochelle-marche.jpg";

import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { IComment } from "../../graphql/interfaces/comment";
import { getPOI } from "../../graphql/pointOfInterest.server";
import { addFavorite, removeFavorite } from "../../graphql/users.server";
import { createComment, getComments } from "../../graphql/comment.server";

import { useUser } from "../../context/UserContext";

import {
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Star } from "lucide-react";

export const Comments = () => {
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(getComments);

  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!commentsLoading && commentsData && commentsData.Comments) {
      setComments(commentsData.Comments);
    }
  }, [commentsLoading, commentsData]);

  console.log(comments);

  if (commentsLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (commentsError) {
    console.log(commentsError);
  }

  return (
    <div className="comments-wrapper">
      {comments.map((comment) => (
        <div className="comment" key={comment.id} id={`comment-${comment.id}`}>
          <p>{comment.comment}</p>
          <div className="comment__note">
            <Star fill="#ff4700" stroke="#ff4700" />
            <p>{comment.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const PointOfInterest = () => {
  const { poiId } = useParams();

  const {
    loading: poiLoading,
    error: poiError,
    data: poiData,
  } = useQuery(getPOI, {
    variables: {
      pointOfInterestId: poiId,
    },
  });

  const [singlePOI, setSinglePOI] = useState<IPointOfInterest>();

  const [comment, setComment] = useState("");
  const [note, setNote] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!poiLoading && poiData && poiData.pointOfInterest) {
      setSinglePOI(poiData.pointOfInterest);
    }
  }, [poiLoading, poiData]);

  console.log(singlePOI);

  if (poiLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (poiError) {
    console.log(poiError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div className="container single-poi">
      <div className="single-poi-content">
        <div className="content-img">
          <img src={ImagePoi} alt="poi-img" />
        </div>
        <h2 className="content-title">{singlePOI?.name}</h2>
        <p className="content-city">{singlePOI?.city.name}</p>
        <div className="content-categories">
          {singlePOI?.categories.map((category: any) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>
        <p className="content-desc">{singlePOI?.description}</p>
      </div>
      <div className="single-poi-comments">
        <h2>Commentaires</h2>
        <Comments />
        <div className="comment-form">
          <FormControl>
            <FormLabel>Commentaire</FormLabel>
            <Input type="text" placeholder="Ajouter un commentaire" />
          </FormControl>
          <FormControl>
            <FormLabel>Note</FormLabel>
            <NumberInput max={5} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default PointOfInterest;
