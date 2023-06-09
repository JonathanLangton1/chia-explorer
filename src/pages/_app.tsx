import ErrorBoundary from "~/components/ErrorBoundary/ErrorBoundary";
import { SessionProvider } from "next-auth/react";
import Header from "~/components/Header/Header";
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { api } from "~/utils/api";


import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress color="#16a34a" startPosition={0.8} />
      <Header />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Toaster position="bottom-right" />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
