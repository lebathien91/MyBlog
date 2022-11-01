import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import GlobalState from "@/store/GlobalState";
import Notify from "@/components/Notify";
import SocketClient from "@/components/SocketClient";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GlobalState>
      <SocketClient />
      <Notify />
      {getLayout(<Component {...pageProps} />)}
    </GlobalState>
  );
}
