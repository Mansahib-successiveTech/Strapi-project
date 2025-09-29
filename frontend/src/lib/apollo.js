"use client";

import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

// Create auth middleware
const authLink = new ApolloLink((operation, forward) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("strapi_jwt") : null;

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token?token:"",
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:1337/graphql", // Strapi GraphQL endpoint
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
