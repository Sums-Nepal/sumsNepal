import React, { useEffect } from "react";
import type { ProtectedWrapperProps } from "../types";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks";

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const params = useLocation();
  const { user } = useCurrentUser();
  useEffect(() => {
    if (
      user &&
      (params.pathname === "/login" || params.pathname === "/register")
    ) {
      window.location.href = "/";
    }
  });
  return <>{children}</>;
};

export default ProtectedWrapper;
