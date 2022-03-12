import React from "react";
// Next
import type { AppProps } from "next/app";
// Styles
import "@assets/main.css";
import "keen-slider/keen-slider.min.css";
// Components
import { UIProvider } from "@components/ui/context";

const Noop: React.FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: React.FC } }) {
  const Layout = Component.Layout ?? Noop;

  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </UIProvider>
  );
}

export default MyApp;
