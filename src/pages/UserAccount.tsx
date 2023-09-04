import React from "react";
import { useQuery } from "@apollo/client";
import { getFavorites } from "../graphql/users.server";
import "../assets/styles/layouts/Account.scss";

const UserAccount = () => {
  const { loading, error, data } = useQuery(getFavorites);

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const { favorites } = data;

  return (
    <div className="user-account">
      <h2>Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <ul>
          {favorites.map((favorite: any) => (
            <li key={favorite.id}>
              <span>{favorite.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAccount;
