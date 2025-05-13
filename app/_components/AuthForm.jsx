'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
function AuthForm({type}) {
    const {register,formState:{errors},handleSubmit} = useForm();
    const [isSubmitting,setIsSubmitting] = useState(false);
    const router = useRouter();
    console.log(type);

    async function signUp(data){
      try{
        setIsSubmitting(true)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/createUser`,data);
        console.log(res.data);
        if(res.data.status === "success"){
           localStorage.setItem("token", res.data.token);
           window.location.href = "/transaction-history";
        }
      }
      catch(err){
        console.log(err);
        toast.error('unable to create account, please try again');
      }finally{
        setIsSubmitting(false);
      }
    }

    async function signIn(data){
      try {
        setIsSubmitting(true)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          data,{withCredentials:true}
        );
        console.log(res);
        if (res.data.status === "success"){
          localStorage.setItem('token',res.data.token);
          window.location.href = '/transaction-history';
        }
      } catch (err) {
        console.log(err);
        toast.error("unable to login, please check email or password");
      }finally{
        setIsSubmitting(false);
      }
    }

    return (
      <form
        onSubmit={handleSubmit(type === "login" ? signIn : signUp)}
        className="lg:w-[30%] w-[80%]  bg-[var(--surface)] lg:py-10 border-[var(--border)] border-1 lg:px-10 px-5 py-5 rounded-sm"
      >
        {type !== "login" && (
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter username
            </label>
            <input
              type="text"
              {...register("username", {
                required: "userName address is required!",
              })}
              id="userName"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="name@flowbite.com"
            />
            {errors.userName && (
              <p className="text-red-500 pl-1 tracking-wider ">
                {errors.userName.message}
              </p>
            )}
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            {...register("email", { required: "email address is required!" })}
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="name@flowbite.com"
          />
          {errors.email && (
            <p className="text-red-500 pl-1 tracking-wider ">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            {...register("password", { required: "password is required!" })}
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
          />
          {errors.password && (
            <p className="text-red-500 pl-1 tracking-wider ">
              {errors.password.message}
            </p>
          )}
        </div>
        {type === "signup" && (
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <input
              type="password"
              {...register("passwordConfirm", {
                required: "repeat password is required!",
              })}
              id="repeat-password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 pl-1 tracking-wider ">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        )}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              {...register("rememberMe")}
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            remember me for 30 days
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
        <div className="flex gap-2 items-center mt-3">
          <p className="text-[var(--textDark)] ">
            {type === "login"
              ? "don't have an account ?"
              : "already have an account?"}{" "}
          </p>
          <Link
            href={type === "login" ? "/signup" : "login"}
            className="text-blue-500"
          >
            {type === "login" ? "register" : "sign in"}
          </Link>
        </div>
      </form>
    );
}
export default AuthForm