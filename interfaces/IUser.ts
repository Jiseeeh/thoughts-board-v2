import React from "react";

export default interface User {
  username: string;
  password: string;
  photoUrl?: string;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
}
