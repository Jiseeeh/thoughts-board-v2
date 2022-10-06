import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import User from "../interfaces/IUser";

interface NavbarButtonsProps {
  user: User;
  //   onSignOut?: () => void;
  //   onSignIn?: () => void;
  //   onLogIn?: () => void;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ user }) => {
  const router = useRouter();

  const goToSignIn = () => {
    router.push("/signIn");
  };

  const signOut = () => {
    localStorage.removeItem("token");
    router.reload();
  };

  const login = () => {
    router.push("/login");
  };

  return (
    <>
      {user.username ? (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0e172c",
            color: "#fffffe",
            ":hover": {
              background: "#0e172c",
            },
          }}
          onClick={signOut}
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
            onClick={goToSignIn}
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
            onClick={login}
          >
            Login
          </Button>
        </>
      )}
    </>
  );
};

export default NavbarButtons;
