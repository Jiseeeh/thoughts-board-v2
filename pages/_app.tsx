import { ScopedCssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import UserContext from "../lib/UserContext";
import User from "../interfaces/IUser";
import { useAuthentication } from "../lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const { isAuthenticated, username, password } = useAuthentication();
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const userValue = useMemo(() => ({ ...user, setUser }), [user, setUser]);

  useEffect(() => {
    if (isAuthenticated) {
      setUser({ username, password });
      
      // used for when the user navigates to 
      // signIn or login even when authenticated
      router.push("/")
    }
  }, [isAuthenticated, password, router, username]);

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
