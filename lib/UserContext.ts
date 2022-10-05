import { createContext } from "react";

import User from "../interfaces/IUser";

export default createContext<User>({
  username: "",
  password: "",
});
