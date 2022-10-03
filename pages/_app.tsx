import { ScopedCssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import "../styles/globals.css"
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ScopedCssBaseline>
        <Navbar />
        <Component {...pageProps} />
      </ScopedCssBaseline>
    </>
  );
}

export default MyApp;
