import { AppProps } from 'next/app';
import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/apollo/index';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
