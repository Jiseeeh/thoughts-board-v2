import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import { Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "../../../components/Container";
import { ThoughtForm } from "../../../interfaces/IThoughtForm";
import { fetchThought } from "../../../lib/prismaQueries";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThoughtForm>();

  const onSubmit: SubmitHandler<ThoughtForm> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("username");
    if (loggedUser === data["user"].username) setIsOwnThought(true);
    console.log(data["thought"]);
  }, []);

  return (
    <>
      <Container>{/* OPTIONALLY RENDER SAVE BUTTON */}</Container>
    </>
  );
};

export default Thought;
