import { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider as ApolloClientProvider,
  InMemoryCache,
} from "@apollo/client";

const ApolloProvider = ({ children }) => {
  const client = useMemo(() => {
    return new ApolloClient({
      uri: `https://graph.proworkflow.com/${process.env.REACT_APP_WORKSPACE}`,
      cache: new InMemoryCache(),
      headers: {
        authorization: process.env.REACT_APP_API_KEY,
      },
    });
  }, []);

  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};

export default ApolloProvider;
