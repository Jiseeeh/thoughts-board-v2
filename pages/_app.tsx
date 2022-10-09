import { ScopedCssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import UserContext from "../lib/UserContext";
import User from "../interfaces/IUser";
import useAuthentication from "../lib/hooks/useAuthentication";

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated, username, password } = useAuthentication();
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const userValue = useMemo(() => ({ ...user, setUser }), [user, setUser]);

  useEffect(() => {
    if (isAuthenticated) setUser({ username, password });
  }, [isAuthenticated, password, router, username]);

  return (
    <UserContext.Provider value={userValue}>
      <ScopedCssBaseline>
        <Navbar />
        <Component {...pageProps} />
      </ScopedCssBaseline>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
