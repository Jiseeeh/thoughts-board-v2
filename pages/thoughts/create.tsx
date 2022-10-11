import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

import Container from "../../components/Container";
import Create from "../../components/Create";
import { ThoughtForm } from "../../interfaces/IThoughtForm";

// ? Component
const CreateThought: React.FC = () => {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

    // toast success then back to home
    if (response.data.success) {
      // to prevent spam
      setIsButtonDisabled(true);

      toast.success("Thought created!", {
        duration: 2000,
        position: "bottom-left",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <>
      <Container>
        <Create
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isButtonDisabled={isButtonDisabled}
          areFieldsDisabled={false}
        />
      </Container>
    </>
  );
};

export default CreateThought;
