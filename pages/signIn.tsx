import React, { useState, useEffect } from "react";
import { Box, TextField, Stack, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "../components/Container";
import Button from "../components/Button";

type FormData = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  return (
    <>
      <Container>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ minHeight: "100vh" }}
        >
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh" }}
          >
            <Typography variant="h2">Sign in</Typography>
            <TextField
              label="username"
              autoComplete="off"
              spellCheck={false}
              {...register("username", { required: true })}
            />
            {errors.username && <span>Username is required.</span>}
            <TextField
              label="password"
              autoComplete="off"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Password is required.</span>}
            <Button submit content="Submit" />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
