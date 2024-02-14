import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../assets/styles/layouts/Main.scss";
import Home from "../Home";
import Contact from "../Contact/Contact";
import Cities from "../Cities/Cities";
import AdminAccount from "../../pages/AdminAccount";
import UserAccount from "../../pages/UserAccount";
import PointOfInterest from "../PointOfInterest/PointOfInterest";
import { useUser } from "../../context/UserContext";

const Main = () => {
  const { user } = useUser();
  /* const { pathname } = useLocation(); */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si user n'est pas défini, c'est encore en cours de chargement
    if (user === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/pois/:id" element={<PointOfInterest />} />
        {user && (
          <>
            <Route path="/admin" element={<AdminAccount />} />
            <Route path="/my-account" element={<UserAccount />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default Main;
