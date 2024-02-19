import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { getUsers, findUser, deleteUser } from "../graphql/users.server";

import { useUser } from "../context/UserContext";

import AllPois from "../components/Dashboard/AllPois";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import "../assets/styles/layouts/Account.scss";
import AllCities from "../components/Dashboard/AllCities";
import AllCategories from "../components/Dashboard/AllCategories";
import AllUsers from "../components/Dashboard/AllUsers";
import AllPictures from "../components/Dashboard/AllPictures";
import AllFavorites from "../components/Dashboard/AllFavorites";

const AdminAccount = () => {
  return (
    <div className="container account admin-account">
      <h2 className="account__title">Admin Dashboard</h2>
      <Tabs isFitted variant="soft-rounded">
        <TabList>
          <Tab>Villes</Tab>
          <Tab>Catégories</Tab>
          <Tab>Points d'intérêt</Tab>
          <Tab>Images</Tab>
          <Tab>Utilisateurs</Tab>
          <Tab>Favories</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllCities />
          </TabPanel>
          <TabPanel>
            <AllCategories />
          </TabPanel>
          <TabPanel>
            <AllPois />
          </TabPanel>
          <TabPanel>
            <AllPictures />
          </TabPanel>
          <TabPanel>
            <AllUsers />
          </TabPanel>
          <TabPanel>
            <AllFavorites />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdminAccount;
