import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) router.push("/signIn");
    // verify token
    (async function () {
      const response = await axios.post("/api/verify", { token });

      if (response.data.success) {
        // set for context
        const { username, password } = response.data.decoded;
        setUsername(username);
        setPassword(password);
        setIsAuthenticated(true);
        return;
      }
      router.push("/signIn");
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuthenticated, username, password };
}
