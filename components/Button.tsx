import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

interface ButtonComponentProps {
  content: string;
  submit: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  content,
  submit,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <Button
        type={submit ? "submit" : "button"}
        variant="contained"
        sx={{
          bgcolor: "#0e172c",
          color: "#fffffe",
          ":hover": {
            background: "#0e172c",
          },
          margin: 1,
        }}
        onClick={onClick}
        disabled={isDisabled || false}
      >
        {content}
      </Button>
    </>
  );
};

export default ButtonComponent;
