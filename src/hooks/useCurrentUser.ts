import React, { useEffect, useState } from "react";
import userService from "../services/user";

import type { IUser } from "../types";

const useCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    (async () => {
      const user = await userService.getCurrentUser();
      setUser(user.data);
    })();
  }, []);

  return { user };
};

export default useCurrentUser;
