import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./context/UserContext";

import "./App.scss";

const client = new ApolloClient({
  uri: "http://localhost:5070",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <NavBar />
        <Main />
        <Footer />
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
