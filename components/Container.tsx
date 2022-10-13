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
          minHeight: "100vh",
          paddingTop: "5rem",
        }}
      >
        <Head>
          <title>{pageTitle || "Thoughts Board"}</title>
          <meta
            name="description"
            content="A simple web app called Thoughts Board, where you can submit your thoughts and ideas freely. Share your thoughts and ideas in Thoughts Board now!"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </Container>
    </React.Fragment>
  );
}
