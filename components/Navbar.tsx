import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useRouter } from "next/router";

import NavbarButtons from "./NavbarButtons";
import UserContext from "../lib/UserContext";

export default function Navbar() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  function backToHome() {
    if (router.pathname === "/") return;
    router.push("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#f9f8fc" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="icon"
            sx={{ mr: 2 }}
            onClick={backToHome}
          >
            <Image
              src="/home.svg"
              alt="Home icon"
              height={35}
              width={35}
              priority
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#0e172c" }}
          >
            T-B
          </Typography>
          <NavbarButtons user={userContext} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
