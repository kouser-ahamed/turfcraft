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
    <div className="relative isolate flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_36%),radial-gradient(circle_at_top_right,rgba(71,85,105,0.22),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef6f2_100%)]" />
      <div className="absolute -left-24 top-10 -z-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 -z-10 h-48 w-48 rounded-full bg-slate-500/15 blur-3xl" />

      <Card className="mx-auto w-full max-w-md rounded-3xl border border-white/70 bg-white/75 px-5 py-7 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:max-w-lg sm:px-8 sm:py-9">
        <ToastContainer />

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
              Login
            </span>
          </h1>
        </div>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {errorMessage && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-center text-xs font-medium text-rose-600 shadow-sm sm:text-sm">
              {errorMessage}
            </div>
          )}

          <TextField isRequired name="email" type="email">
            <Label className="text-sm font-medium text-slate-700 sm:text-base">
              Email
            </Label>
            <Input
              placeholder="john@example.com"
              className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
            />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-sm font-medium text-slate-700 sm:text-base">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
            />
            <Description className="text-xs leading-5 text-slate-500 sm:text-sm">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button
              type="submit"
              className="group h-11 w-full rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:via-emerald-400 hover:to-lime-400 hover:shadow-xl hover:shadow-emerald-500/25 sm:h-12"
            >
              LogIn
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:h-12"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-7 flex flex-col items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 sm:text-sm">
            Or
          </p>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-slate-900 sm:h-12"
          >
            <GrGoogle className="text-base" />
            Sign in with Google
          </Button>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
            >
              Register
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}