import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Stack,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
} from "@mui/material";

import Container from "../../components/Container";
import Button from "../../components/Button";
import Thought from "../../interfaces/IThoughts";

// ? Tooltip from mui
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f9f8fc",
    color: "#0e172c",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

// ? Component
const CreateThought: React.FC = () => {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const width = {
    minWidth: 300,
    maxWidth: 300,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Thought>();

  const onSubmit: SubmitHandler<Thought> = async (data) => {
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
            placement="right"
            title={
              <React.Fragment>
                <Typography color="inherit">This supports markdown</Typography>
                <ReactMarkdown>
                  {
                    "# # Heading\n## ## Heading\n### ### Heading\n#### #### Heading\n##### ##### Heading\n###### ###### Heading"
                  }
                </ReactMarkdown>
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
              content="Post"
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
