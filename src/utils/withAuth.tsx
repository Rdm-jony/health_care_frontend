import { role } from "@/constants/role";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);


    if (!isLoading && !data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole == role.ADMIN && !isLoading && data?.role == role.SUPER_ADMIN) {
      return <Component />;

    }

    if (requiredRole && !isLoading && requiredRole !== data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};