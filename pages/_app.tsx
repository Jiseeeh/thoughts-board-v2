import { ScopedCssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import UserContext from "../lib/UserContext";
import User from "../interfaces/IUser";
import theme from "../mui/theme";
import useAuthentication from "../lib/hooks/useAuthentication";

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated, username, password } = useAuthentication();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const userValue = useMemo(() => ({ ...user, setUser }), [user, setUser]);

  useEffect(() => {
    if (isAuthenticated) setUser({ username, password });
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <Navbar />
          <Component {...pageProps} />
        </ScopedCssBaseline>
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
