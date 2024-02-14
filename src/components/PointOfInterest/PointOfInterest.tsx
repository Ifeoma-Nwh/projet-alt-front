import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import "../../assets/styles/layouts/PointOfInterest.scss";
import { IPointOfInterest } from "../../graphql/interfaces/pointofinterest";
import { IComment } from "../../graphql/interfaces/comment";
import { getPOI } from "../../graphql/pointOfInterest.server";
import { addFavorite, removeFavorite } from "../../graphql/users.server";
import { createComment } from "../../graphql/comment.server";

import { useUser } from "../../context/UserContext";

interface PointOfInterestData {
  pointOfInterest: IPointOfInterest;
}

const PointOfInterest = () => {
  const { user } = useUser();
  const { id } = useParams<string>();
  const { loading, error, data } = useQuery<PointOfInterestData>(getPOI, {
    variables: { pointOfInterestId: id },
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const [addFavoriteMutation] = useMutation(addFavorite);
  const [removeFavoriteMutation] = useMutation(removeFavorite);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const [createCommentMutation] = useMutation(createComment);

  const [commentText, setCommentText] = useState("");
  const [commentNote, setCommentNote] = useState(0);

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const { pointOfInterest } = data!;

  const toggleFavorite = async () => {
    if (!user) {
      setShowLoginMessage(true);
    }

    if (isFavorite) {
      await removeFavoriteMutation({
        variables: { pointOfInterestId: id },
      });
    } else {
      await addFavoriteMutation({
        variables: { pointOfInterestId: id },
      });
    }

    setIsFavorite(!isFavorite);
  };

  const addCommentHandler = async () => {
    if (!user) {
      setShowLoginMessage(true);
    }

    if (commentText.trim() === "") {
      setCommentText("Ajoute un petit message :)");
    }

    await createCommentMutation({
      variables: {
        data: {
          pointOfInterestId: id,
          comment: commentText,
          note: commentNote,
        },
      },
    });

    setCommentText("");
    setCommentNote(0);
  };

  const comments: IComment[] = Array.isArray(pointOfInterest.comments)
    ? pointOfInterest.comments
    : [];

  return (
    <div className="poi-section">
      <h2>{pointOfInterest.name}</h2>
      <p>{pointOfInterest.description}</p>

      <button onClick={toggleFavorite}>
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      {showLoginMessage && (
        <div>
          Connecte toi pour ajouter ce point d'intérêt à tes favoris :).
        </div>
      )}

      <h3>Commentaires :</h3>
      <div>
        {comments.map((comment: IComment) => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>Note: {comment.note}</p>
          </div>
        ))}
      </div>

      {user && (
        <div className="comment-section">
          <textarea
            rows={4}
            placeholder="Ajouter un commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <input
            type="number"
            placeholder="Note (1-5)"
            min="1"
            max="5"
            value={commentNote}
            onChange={(e) => setCommentNote(parseInt(e.target.value))}
          />
          <button onClick={addCommentHandler}>Ajouter un commentaire</button>
        </div>
      )}
    </div>
  );
};

export default PointOfInterest;
