import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Stack,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

import Container from "../../components/Container";
import Button from "../../components/Button";
import HtmlTooltip from "../../components/HtmlToolTip";
import useAuthentication from "../../lib/hooks/useAuthentication";
import { showToast } from "../../lib/helper";
import { ThoughtForm } from "../../interfaces/IThoughtForm";

// ? Component
const CreateThought: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthentication();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const width = {
    minWidth: 300,
    maxWidth: 300,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThoughtForm>();

  const onSubmit: SubmitHandler<ThoughtForm> = async (data) => {
    const response = await axios.post("/api/create", {
      data,
      username: localStorage.getItem("username"),
    });

    // to prevent spam
    setIsButtonDisabled(true);

    // toast success then back to home
    if (response.data.success) {
      showToast("success", "Thought created!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  // prevent posting if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setIsButtonDisabled(true);
      return;
    }

    setIsButtonDisabled(false);
  }, [isAuthenticated]);

  return (
    <>
      <Container pageTitle="Create Thought">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{
            mt: 3,
          }}
        >
          <Typography variant="h4">Create a Thought</Typography>
          <Box sx={{ ...width }}>
            {/* SELECT TAG */}
            <FormControl fullWidth>
              <InputLabel id="tag">Tag</InputLabel>
              <Select
                defaultValue={"Random"}
                labelId="tag"
                label="Tag"
                {...register("tag")}
              >
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"Random"}>Random</MenuItem>
                <MenuItem value={"Life"}>Life</MenuItem>
                <MenuItem value={"Truth"}>Truth</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* TITLE */}
          <TextField
            label="Title"
            autoComplete="off"
            spellCheck={false}
            sx={{ ...width }}
            inputProps={{ maxLength: 12 }}
            helperText={errors.title && "Title is required"}
            {...register("title", { required: true })}
          />
          {/* TOOLTIP */}
          <HtmlTooltip
            placement="bottom"
            title={
              <React.Fragment>
                <Typography color="inherit">Express yourself here!</Typography>
                Just let it out ! but still, be{" "}
                <strong>
                  <em>wise</em>
                </strong>
                <br />
                on how you choose your words!
              </React.Fragment>
            }
          >
            {/* BODY */}
            <TextField
              label="Body"
              multiline
              rows={10}
              sx={{ ...width }}
              inputProps={{ maxLength: 500 }}
              helperText={errors.body && "Body is required"}
              {...register("body", { required: true })}
            />
          </HtmlTooltip>
          {/* POST BUTTON */}
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginTop: "1rem" }}
          >
            <Button
              submit={false}
              content={!isAuthenticated ? "Login first!" : "Post"}
              isDisabled={isButtonDisabled}
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default CreateThought;
