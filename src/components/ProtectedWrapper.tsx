import React, { useEffect } from "react";
import type { ProtectedWrapperProps } from "../types";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks";
import LoadingBar from "./Loaders/LoadingBars";

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const params = useLocation();
  const { user, isLoading } = useCurrentUser();
  
  useEffect(() => {
    if (
      user &&
      (params.pathname === "/login" ||
        params.pathname === "/register" ||
        params.pathname === "/verify")
    ) {
      window.location.href = "/";
    } else if (!user && params.pathname === "/project/create") {
      window.location.href = "/login";
    }
  }, [location.pathname, user]);

  if (isLoading)
    return (
      <div className="fixed inset-0 grid place-items-center">
        <LoadingBar
          title="SUMS NEPAL"
          subtitle="Student Unified Management System"
          tips="Preparing your workspace…"
        />
      </div>
    );
  return <>{children}</>;
};

export default ProtectedWrapper;
