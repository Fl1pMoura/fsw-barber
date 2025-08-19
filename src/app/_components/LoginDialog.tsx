"use client";
import { signIn } from "next-auth/react";
import GoogleIcon from "./svgs/googleIcon";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const LoginDialog = () => {
  function handleSignIn() {
    signIn("google");
  }
  return (
    <>
      <DialogHeader className="">
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription className="mt-2 block">
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>
      <Button onClick={handleSignIn} variant={"outline"}>
        <GoogleIcon />
        Google
      </Button>
    </>
  );
};

export default LoginDialog;
