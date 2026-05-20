"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } else {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
  
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 md:mt-10">
      
      <Card className="border mx-auto w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-sm">
        
        <ToastContainer />

        <h1 className="text-center text-lg sm:text-2xl font-bold mb-4">
          Login
        </h1>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3 py-2 rounded-lg text-xs sm:text-sm text-center">
              {errorMessage}
            </div>
          )}

          <TextField isRequired name="email" type="email">
            <Label className="text-sm sm:text-base">Email</Label>
            <Input
              placeholder="john@example.com"
              className="h-10 sm:h-11 text-sm"
            />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-sm sm:text-base">Password</Label>
            <Input
              placeholder="Enter your password"
              className="h-10 sm:h-11 text-sm"
            />
            <Description className="text-xs sm:text-sm">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              className="w-full bg-slate-900 text-white font-semibold text-sm h-10 sm:h-11"
            >
              LogIn
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full text-sm h-10 sm:h-11"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs sm:text-sm">Or</p>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm h-10 sm:h-11"
          >
            <GrGoogle />
            Sign in with Google
          </Button>

          <p className="text-center text-xs sm:text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 font-bold">
              Register
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}