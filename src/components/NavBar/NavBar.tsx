import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../../assets/styles/components/NavBar.scss";
import DocData from "../Data.json";

//import { ModalAuth } from "../ModalAuth/ModalAuth";
import { Modal } from "../ModalAuth/Modal";
import Signin from "../SignInButton/SignIn";
import { useUser } from "../../context/UserContext";

export const links = [
  { label: "CityGuide", path: "/" },
  { label: "Explorer", path: "/cities" },
  { label: "Contact", path: "/contact" },
];

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function NavBar({ ModalVisible, visible }: any) {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [screenXWidth, setScreenXWidth] = useState(window.innerWidth);

  const { logout, user } = useUser();

  useEffect(() => {
    const changeWidth = () => {
      setScreenXWidth(window.innerWidth);

      if (window.innerWidth > 1060) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const handleShowModal = () => {
    ModalVisible(!visible);
  };

  return (
    <header className="container">
      <div className="header-wrapper row">
        <div className="header-nav row">
          {links.map((link) => (
            <NavLink to={link.path} key={link.label}>
              {link.label}
            </NavLink>
          ))}
          {user && user.role === 1 && (
            <NavLink to="/admin" key="Mon Compte">
              Mon Compte
            </NavLink>
          )}
          {user && user.role !== 1 && (
            <NavLink to="/my-account" key="Mon Compte">
              Mon Compte
            </NavLink>
          )}
        </div>
        <div className="header-button">
          <Signin />
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children, ...props }: { to: string; children: any }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
    end: true,
  });
  return (
    <Link
      className={`col-3-md link-item link-item-${children} ${
        isActive ? "active" : ""
      }`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
