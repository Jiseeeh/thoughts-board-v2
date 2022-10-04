import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useRouter } from "next/router";

import NavbarButtons from "./NavbarButtons";

export default function Navbar() {
  const router = useRouter();
  const user = null;

  function backToHome() {
    router.push("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#fff" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="icon"
            sx={{ mr: 2 }}
            style={{
              height: "3rem",
              width: "3rem",
            }}
          >
            <Image
              src="/home.gif"
              alt="Home icon"
              layout="fill"
              onClick={backToHome}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#0e172c" }}
          >
            Home
          </Typography>
          <NavbarButtons user={user} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
