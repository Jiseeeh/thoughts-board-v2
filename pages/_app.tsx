import { ScopedCssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useState, useMemo } from "react";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import UserContext from "../lib/UserContext";
import User from "../interfaces/IUser";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const userValue = useMemo(() => ({ ...user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userValue}>
      <ScopedCssBaseline>
        <Navbar />
        <Component {...pageProps} />
      </ScopedCssBaseline>
    </UserContext.Provider>
  );
}

export default MyApp;
