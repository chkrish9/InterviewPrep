import { isAuthenticatd } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticatd();
  if (isUserAuthenticated) {
    redirect("/");
  }
  return <div className="auth-layout">{children}</div>;
};

export default Layout;
