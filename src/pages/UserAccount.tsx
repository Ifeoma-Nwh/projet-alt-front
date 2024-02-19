import React from "react";

import "../assets/styles/layouts/Account.scss";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AllFavorites from "../components/Dashboard/AllFavorites";

const UserAccount = () => {
  return (
    <div className="container account user-account">
      <h2 className="account__title">Mon Dashboard</h2>
      <Tabs isFitted variant="soft-rounded">
        <TabList>
          <Tab>Favories</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllFavorites />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UserAccount;
