import React, { useState, useContext } from "react";
import { Box, TextField, Stack, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

import Container from "../components/Container";
import Button from "../components/Button";
import UserContext from "../lib/UserContext";
import { showToast } from "../lib/helper";
import useAuthentication from "../lib/hooks/useAuthentication";
import useAuthRedirect from "../lib/hooks/useAuthRedirect";

type FormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { setUser } = useContext(UserContext);
  const { isAuthenticated } = useAuthentication();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await axios.post("/api/login", data);

    if (!response.data.success) {
      showToast("error", "Login Failed!");
      return;
    }
    // set for context
    const { username, password } = response.data.user;
    if (setUser !== undefined) setUser({ username, password });

    // set token to local
    // for later use, to verify the user.
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username);

    // prevent spam;
    setIsButtonDisabled(true);
    showToast("success", "Login Success!");
    setTimeout(() => {
      // redirect to home
      router.push("/");
    }, 2000);
  };

  // custom hook for redirecting the user if he/she
  // is already logged in.
  useAuthRedirect(isAuthenticated);

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
            <Typography variant="h2">Log in</Typography>
            <TextField
              label="username"
              autoComplete="off"
              spellCheck={false}
              helperText={errors.username && "Username is required!"}
              {...register("username", { required: true })}
            />
            <TextField
              label="password"
              autoComplete="off"
              type="password"
              helperText={errors.password && "Password is required"}
              {...register("password", { required: true })}
            />
            <Button submit content="Login" isDisabled={isButtonDisabled} />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Login;
