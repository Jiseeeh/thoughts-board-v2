import React, { useState, useEffect, useCallback, useContext } from "react";
import { Box, TextField, Stack, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import debounce from "lodash.debounce";
import axios from "axios";
import { useRouter } from "next/router";

import Container from "../components/Container";
import Button from "../components/Button";
import SignInMessage from "../components/SignInMessage";
import UserContext from "../lib/UserContext";

type FormData = {
  username: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [formValue, setFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isValid) return;

    // set data to the context
    if (setUser !== undefined) setUser({ ...data });

    // sign in to api
    const response = await axios.post("/api/sign-in", data);

    if (response.data) {
      localStorage.setItem("token", response.data.token);
      router.push("/");
    }
  };

  // on input change
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 6) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }
    if (regex.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkInput(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkInput = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 6) {
        const response = await axios.post("/api/check-username", {
          username,
        });

        if (response.data.isValid) setIsValid(true);

        setIsLoading(false);
      }
    }, 500),
    []
  );

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
              helperText={formValue.length === 0 && "Username is required!"}
              value={formValue}
              {...register("username", { required: true })}
              onChange={onInputChange}
            />
            <SignInMessage
              username={formValue}
              isValid={isValid}
              isLoading={isLoading}
            />
            <TextField
              label="password"
              autoComplete="off"
              type="password"
              helperText={errors.password && "Password is required"}
              {...register("password", { required: true })}
            />
            <Button submit content="Submit" />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
