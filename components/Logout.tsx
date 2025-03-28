"use client";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Logout = () => {
  const signOut = async () => {
    await logOut();
    redirect("/sign-in");
  };

  return (
    <div className="flex justify-end w-full">
      <Button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={signOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
