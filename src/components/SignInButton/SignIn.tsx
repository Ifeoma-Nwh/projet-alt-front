import React, { useState } from "react";
import { ModalAuth } from "../ModalAuth/ModalAuth";
import "../../assets/styles/components/SignIn.scss";
import { useUser } from "../../context/UserContext";

function SigninBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { email, logout } = useUser();

  return (
    <>
      <div className="signin-wrapper">
        {email ? (
          <>
            <button className="signin-button" onClick={() => setIsOpen(true)}>
              {email}
            </button>
            <button className="logout-button" onClick={logout}>
              Se déconnecter
            </button>
          </>
        ) : (
          <button className="signin-button" onClick={() => setIsOpen(true)}>
            Se connecter
          </button>
        )}
      </div>
      <ModalAuth open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default SigninBtn;
