import React, { useEffect, useState } from "react";
import userService from "../services/user";

import type { IUser } from "../types";

const useCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const user = await userService.getCurrentUser();
        setUser(user.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, isLoading: loading, error };
};

export default useCurrentUser;
