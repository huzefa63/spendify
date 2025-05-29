"use client";

import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { MdEmail, MdLock } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import FormFields from "./FormFields"; // Make sure this component exists

function AuthForm({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    getValues
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const router = useRouter();

  const field = useRef([
    ...(type !== "login"
      ? [
          {
            labelText: "Username",
            icon: <FaUser className="text-purple-600" />,
            name: "username",
            placeholder: "Enter your name",
            register,
            validation: {
              required: "Username is required!",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            },
          },
        ]
      : []),
    {
      labelText: "Your email",
      icon: <MdEmail className="text-purple-600" />,
      name: "email",
      placeholder: "Enter your email",
      register,
      validation: {
        required: "Email is required!",
      },
    },
    {
      labelText: "Password",
      icon: <MdLock className="text-purple-600" />,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      register,
      validation: {
        required: "Password is required!",
        minLength: { value: 8, message: "Minimum 8 characters required" },
      },
    },
    ...(type === "signup"
      ? [
          {
            labelText: "Repeat Password",
            icon: <MdLock className="text-purple-600" />,
            name: "passwordConfirm",
            type: "password",
            placeholder: "Repeat your password",
            register,
            validation: {
              validate: (val) => {
                if (val === getValues("password")) return true;
                return "password did not match";
              },
            },
          },
        ]
      : []),
  ]);

  const mutationFn = async (data) => {
    const url =
      type === "login"
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/createUser`;

    const res = await axios.post(url, data, { withCredentials: true });

    if (res.data.status === "success") {
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } else {
      throw new Error("Operation failed");
    }
  };

  const mutation = useMutation({
    mutationFn,
    
  });

  return (
    <div className="w-[90%] lg:w-[30%] px-5 py-4 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
      <p className="text-center text-[var(--text)] lg:text-2xl mb-4 font-bold tracking-widest">{type==='login'?'Login Form':'Signup Form'}</p>
      <form
        onSubmit={handleSubmit((data) =>
          mutation.mutateAsync(data)
        )}
        className="space-y-4"
      >
        {field.current.map((el, i) => (
          <FormFields mode='no-val-label-space' key={i} error={errors} fieldData={el} />
        ))}

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("rememberMe")}
            id="rememberMe"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label
            htmlFor="rememberMe"
            className="text-sm text-gray-900 dark:text-gray-300"
          >
            Remember me for 30 days
          </label>
        </div>

        <button
          disabled={isSubmitting}
          className="text-white disabled:cursor-not-allowed relative hover:cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span className={`${isSubmitting && 'opacity-0'}`}>{type === "login" ? "login" : "Register new account"}</span>
          {isSubmitting && (
            <ImSpinner9 className="mx-auto my-auto animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </button>

        <div className="flex gap-2 mt-3 text-sm text-[var(--textDark)]">
          <p>
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "login" ? "/signup" : "/login"}
            className="text-blue-500"
          >
            {type === "login" ? "Register" : "Sign In"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
