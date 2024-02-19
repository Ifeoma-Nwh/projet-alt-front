import React, { useState } from "react";
import "../../assets/styles/components/ModalAuth.scss";
import { useMutation } from "@apollo/client";
import Modal from "../Modal/Modal";
import { useUser } from "../../context/UserContext";
import { signin, createUser } from "../../graphql/users.server";

export interface IProps {
  open: boolean;
  onClose: any;
}

export const ModalAuth = ({ open, onClose, ...props }: IProps) => {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useUser();
  const [handleSigninMutation] = useMutation(signin, {
    variables: {
      email,
      password,
    },
  });

  const [handleSignupMutation] = useMutation(createUser, {
    variables: {
      data: {
        email,
        password,
        username: "user",
      },
    },
  });

  const handleSignin = async () => {
    try {
      const userSigninData = await handleSigninMutation();
      if ("signin" in userSigninData?.data) {
        setEmail("");
        setPassword("");
        login(userSigninData?.data?.signin);
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  const handleSignup = async () => {
    try {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!password.match(passwordRegex)) {
        setError(
          "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et doit être au minimum 8 caractères."
        );
        return;
      }

      const userSignupData = await handleSignupMutation();
      if ("createUser" in userSignupData?.data) {
        setEmail("");
        setPassword("");
        setAuthMode("signin");
      }
    } catch (err) {
      console.log(err);
      setError("Une erreur s'est produite lors de l'inscription.");
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signup" ? "signin" : "signup");
  };

  if (!open) return null;
  return (
    <>
      <Modal onClose={onClose} open={open}>
        <>
          <div className="modalAuth__title">
            {authMode === "signin" ? "Se connecter" : "S'inscrire"}
          </div>

          <div className="modalAuth__input">
            <div className="modalAuth__signin-input">
              <label className="modalAuth__label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="modalAuth__label" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error && <div className="modalAuth__error">{error}</div>}
            </div>
            <div className="modalAuth__submit">
              {authMode === "signin" ? (
                <button onClick={handleSignin}>Connexion</button>
              ) : (
                <button onClick={handleSignup}>S'inscrire</button>
              )}
            </div>
          </div>

          <div className="modalAuth__switch">
            <button onClick={changeAuthMode}>
              {authMode === "signin"
                ? "Pas de compte ? Inscris-toi !"
                : "Déjà un compte ? Connecte-toi !"}
            </button>
          </div>
        </>
      </Modal>
    </>
  );
};
