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
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { Heart, Star } from "lucide-react";

export const Comments = () => {
  const { poiId } = useParams();
  const idPoi = parseFloat(poiId as string);
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

  console.log(
    comments
      .filter((comment) => comment.pointOfInterest?.id === idPoi!)
      .map((comment) => {
        return comment;
      })
  );

  if (commentsLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  if (commentsError) {
    console.log(commentsError);
  }

  return (
    <div className="comments-wrapper">
      {comments.length === 0 ? (
        <p className="comments-empty">
          Aucun commentaire pour le moment, n'hésite pas à partager ton avis
        </p>
      ) : (
        comments
          /* .filter((comment) => comment?.pointOfInterest?.id === idPoi!) */
          .map((comment) => (
            <div
              className="comment"
              key={comment.id}
              id={`comment-${comment.id}`}
            >
              <p>{comment.comment}</p>
              <div className="comment__note">
                <Star fill="#ff4700" stroke="#ff4700" />
                <p>{comment.note}</p>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

const PointOfInterest = () => {
  const { poiId } = useParams();

  const { user } = useUser();

  const {
    loading: poiLoading,
    error: poiError,
    data: poiData,
  } = useQuery(getPOI, {
    variables: {
      pointOfInterestId: poiId,
    },
  });

  const [AddFavoriteMutation] = useMutation(addFavorite);
  const [RemoveFavoriteMutation] = useMutation(removeFavorite);

  const [createCommentMutation] = useMutation(createComment, {
    refetchQueries: [getComments, "Comments"],
  });

  const [singlePOI, setSinglePOI] = useState<IPointOfInterest>();

  const [addComment, setAddComment] = useState("");
  const [addNote, setAddNote] = useState(0);
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

  const handleCreateComment = () => {
    const idPoi = parseFloat(poiId as string);
    const idUser = user?.id?.toString();
    createCommentMutation({
      variables: {
        data: {
          pointOfInterestId: idPoi,
          comment: addComment,
          note: addNote,
          createdById: parseFloat(idUser!),
        },
      },
    });
    setAddComment("");
    setAddNote(0);
  };

  const handleFavorite = () => {
    const idPoi = parseFloat(poiId as string);
    const idUser = user?.id?.toString();
    if (isFavorite) {
      RemoveFavoriteMutation({
        variables: {
          pointOfInterestId: idPoi,
          userId: parseFloat(idUser!),
        },
      });
    } else {
      AddFavoriteMutation({
        variables: {
          pointOfInterestId: idPoi,
          userId: parseFloat(idUser!),
        },
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container single-poi">
      <div className="single-poi-content">
        <div className="content-img">
          <img src={ImagePoi} alt="poi-img" />
        </div>
        <div className="content-header">
          <h2 className="content-title">{singlePOI?.name}</h2>
          <Heart
            style={{ cursor: "pointer" }}
            onClick={handleFavorite}
            fill={isFavorite ? "#ff4700" : "none"}
            stroke="#ff4700"
          />
        </div>
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
          <FormControl mt={5}>
            <FormLabel>Commentaire</FormLabel>
            <Textarea
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
              placeholder="Ajoutez un commentaire"
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Note</FormLabel>
            <NumberInput
              onChange={(e) => setAddNote(parseFloat(e))}
              size="sm"
              maxW={20}
              max={5}
              min={0}
              value={addNote}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button onClick={handleCreateComment} colorScheme="blue" mt={4}>
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PointOfInterest;
