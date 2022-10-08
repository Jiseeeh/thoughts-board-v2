import React, { useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";

import Container from "../components/Container";
import Button from "../components/Button";

// ? THIS IS THE PAGE IF THE USER IS ALREADY AUTHENTICATED
const Authenticated: React.FC = () => {
  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <>
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          height="100vh"
        >
          <Typography variant="h3">You are already logged in!</Typography>
          <Button submit={false} content="Back to Home" onClick={backToHome} />
        </Stack>
      </Container>
    </>
  );
};

export default Authenticated;
