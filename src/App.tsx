import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./context/UserContext";

import { ChakraProvider } from "@chakra-ui/react";

import "./App.scss";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:5070",
});

// const socket = socketIO.connect(SERVER, {
//   transports: ["websocket", "polling", "flashsocket"],
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <NavBar />
          <Main />
          <Footer />
        </ChakraProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
