import React, { useState, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import isEqual from "lodash.isequal";
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

import Container from "../../../components/Container";
import Button from "../../../components/Button";
import HtmlTooltip from "../../../components/HtmlToolTip";
import { TagsEnum } from "../../../interfaces/IThoughtForm";
import { fetchThought } from "../../../lib/prismaQueries";
import { showToast } from "../../../lib/helper";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.userId;
  const thoughtId = context.params?.thoughtId;

  const response = await fetchThought(userId, thoughtId);

  return {
    props: { response: JSON.stringify(response) },
  };
};

const Thought: React.FC = ({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data] = useState(JSON.parse(response));
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOwnThought, setIsOwnThought] = useState(false);
  const [tag, setTag] = useState<TagsEnum | string>(data["thought"].tag);
  const [title, setTitle] = useState<string>(data["thought"].title);
  const [body, setBody] = useState<string>(data["thought"].body);
  const router = useRouter();
  const width = {
    minWidth: 300,
    maxWidth: 300,
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("username");
    if (loggedUser === data["user"].username) setIsOwnThought(true);
  }, []);

  const onUpdateBtnClick = async () => {
    const originalThought = {
      tag: data["thought"].tag,
      title: data["thought"].title,
      body: data["thought"].body,
    };
    const thought = {
      tag,
      title,
      body,
    };

    const areThoughtsEqual = isEqual(originalThought, thought);

    // check if a change happened

    //? means there was no change
    if (areThoughtsEqual) {
      showToast("error", "You didn't change anything!");
      return;
    }

    const response = await axios.patch("/api/update", {
      thoughtId: data["thought"].id,
      thought,
    });

    if (response.data.success) {
      // to prevent spam
      setIsButtonDisabled(true);
      showToast("success", "Successfully updated!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const onDeleteBtnClick = async () => {
    const response = await axios.delete("/api/delete", {
      data: {
        thoughtId: data["thought"].id,
      },
    });

    if (response.data.success) {
      // to prevent spam
      setIsButtonDisabled(true);

      showToast("success", "Successfully Deleted!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <>
      <Container pageTitle="Thought">
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
                name="tag"
                disabled={!isOwnThought}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
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
            name="title"
            disabled={!isOwnThought}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            defaultValue={data["thought"].title}
            autoComplete="off"
            spellCheck={false}
            sx={{ ...width }}
            inputProps={{ maxLength: 12 }}
            // helperText={errors.title && "Title is required"}
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
              name="body"
              disabled={!isOwnThought}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              defaultValue={data["thought"].body}
              multiline
              rows={10}
              sx={{ ...width }}
              inputProps={{ maxLength: 500 }}
              // helperText={errors.body && "Body is required"}
            />
          </HtmlTooltip>
          {/* POST BUTTON */}
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginTop: "1rem" }}
          >
            {isOwnThought && (
              <Button
                submit={false}
                content="Update"
                isDisabled={isButtonDisabled}
                onClick={onUpdateBtnClick}
              />
            )}
            {isOwnThought && (
              <Button
                submit={false}
                content="Delete"
                isDisabled={isButtonDisabled}
                onClick={onDeleteBtnClick}
              />
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Thought;
