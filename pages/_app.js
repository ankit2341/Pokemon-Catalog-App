import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client.js";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
