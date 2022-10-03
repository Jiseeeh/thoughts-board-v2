import React from "react";
import Button from "@mui/material/Button";

interface NavbarButtonsProps {
  user: string | null;
  //   onSignOut?: () => void;
  //   onSignIn?: () => void;
  //   onLogIn?: () => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ user }) => {
  return (
    <>
      {user ? (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0e172c",
            color: "#fffffe",
            ":hover": {
              background: "#0e172c",
            },
          }}
        >
          Sign-out
        </Button>
      ) : (
        <>
          {" "}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0e172c",
              color: "#fffffe",
              mr: 1,
              ":hover": {
                background: "#0e172c",
              },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0e172c",
              color: "#fffffe",
              ":hover": {
                background: "#0e172c",
              },
            }}
          >
            Login
          </Button>
        </>
      )}
    </>
  );
};

export default NavbarButtons;
