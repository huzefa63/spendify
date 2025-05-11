"use client";
import Image from "next/image";
import Button from "@/app/_ui/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "./ContextProvider";
import { FaUserCircle } from "react-icons/fa";
const inputStyles =
  "bg-transparent border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-4 py-2";

function SettingsForm() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  // const [user,setUser] = useState({username:'',email:''});
  const {data:userData} = useMyContext();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn:onSubmit,
    onSuccess:()=>{
      queryClient.invalidateQueries(['user']);
    }
  })

  async function handleUpdateNameAndImage(data,token){
    const formData = new FormData();
    formData.append("userName", data.username);
    formData.append("photo", data.photo[0]);
    console.log(formData.get("photo"));
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateUser`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res.data.status === "success") {

      // toast.success("profile updated");
      return true;
    } else{
      return false;
    }
  }

  async function onSubmit(data) {
    const token = localStorage.getItem('token');
    if(data.username && data.username !== userData.username) await handleUpdateNameAndImage(data,token);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file) setImage('');
    if (file) {
      setImage(file.name);
    }
  }

  return (
    <form
      className="w-[95%] p-5 h-[95%] bg-[var(--surface)] rounded-sm"
      onSubmit={handleSubmit((data) => toast.promise(
        mutate.mutateAsync(data),
         {
           loading: 'Updating...',
           success: <b>Profile updated!</b>,
           error: <b>Could not update profile.</b>,
         }
       ))}
    >
      <header className="text-3xl pl-5">Update profile</header>

      <div className="flex gap-6 border-1 border-[var(--border)] py-3 px-5 rounded-sm items-center mt-7">
        {userData?.profileImage ? (
          <div className="h-20 w-20 overflow-hidden rounded-full relative">
            <Image
              fill
              src={userData?.profileImage}
              alt="profile"
              className=""
            />
          </div>
        ) : (
          <FaUserCircle className="h-20 w-20 overflow-hidden rounded-full relative"/>
        )}

        <div className="relative w-fit">
          <input
            type="file"
            // accept="image/*"
            id="image"
            {...register("photo")}
            onChange={handleImageChange}
            className="absolute opacity-0 w-28 z-[99]"
          />
          <label
            htmlFor="image"
            className="text-white bg-blue-700 py-2.5 px-5 mr-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update image
          </label>
          <Button type="secondary">remove image</Button>
          {image && (
            <p className="absolute tracking-wider min-w-[50rem]">{image}</p>
          )}
        </div>
      </div>

      <main className="w-full border-1 border-[var(--border)] mt-5 grid grid-cols-2 grid-rows-2 gap-x-15 gap-y-8 px-10 py-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">email</label>
          <input
            disabled={true}
            value={userData?.email || ""}
            id="email"
            type="text"
            className={`${inputStyles} hover:cursor-not-allowed`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">change username</label>
          <input
            id="username"
            defaultValue={userData?.userName || ""}
            {...register("username")}
            type="text"
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">change password</label>
          <input
            id="password"
            {...register("password")}
            type="password"
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm">repeat password</label>
          <input
            id="passwordConfirm"
            {...register("passwordConfirm")}
            type="password"
            className={inputStyles}
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <label htmlFor="addCategory">add category</label>
          <input
            id="addCategory"
            {...register("categoryName")}
            type="text"
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="deleteCategory">delete category</label>
          <input
            id="deleteCategory"
            {...register("deleteCategory")}
            type="text"
            className={inputStyles}
          />
        </div> */}

        <Button>save changes</Button>
      </main>
    </form>
  );
}

export default SettingsForm;
