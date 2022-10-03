import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function SimpleContainer({ children, pageTitle }: LayoutProps) {
  return (
    <React.Fragment>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#fec7d7",
        }}
      >
        <Head>
          <title>{pageTitle || "Thoughts Board"}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </Container>
    </React.Fragment>
  );
}
