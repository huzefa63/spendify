"use client";
import Image from "next/image";
import Button from "@/app/_ui/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useMyContext } from "./ContextProvider";
import { FaUserCircle,FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import {UsernameUpdateForm,UpdatePasswordForm} from "../_ui/forms/UpdateUserForms";


function SettingsForm() {
  const { register, handleSubmit,formState:{errors},getValues } = useForm({mode:'onSubmit'});
  const {data:userData} = useMyContext();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn:handleUpdateImage,
    onSuccess:()=>{
      queryClient.invalidateQueries(['user']);
    }
  })

  async function handleUpdateImage({photo,token}){
    const formData = new FormData();
    formData.append("photo", photo);
    console.log(formData.get("photo"));
    const res = await axios.patch(
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
      return true;
    } else{
      return false;
    }
  }

  

  async function handleImageChange(e) {
    const photo = e.target.files[0];
    const token = localStorage.getItem('token');
    // if(!photo) setImage('');
    if (photo) {
      if(confirm(`do you want to update your avatar with image ${photo?.name}`)){
        toast.promise(mutate.mutateAsync({photo,token}), {
          loading: "Updating...",
          success: <b>profile photo updated!</b>,
          error: <b>Could not update profile photo.</b>,
        });
      }
    }
  }

  async function handleRemoveImage(){
    if (!userData?.profileImage)
      return Promise.reject();
    if (!confirm("are you sure you want to remove profile image")) return;
    try{
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profileImage`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status === "success"){
        queryClient.invalidateQueries(["user"]);
        return Promise.resolve();
      }
      return Promise.reject();
    }catch(err){
      return Promise.reject();
    }
  }

  return (
    <div className="w-[95%] lg:p-5 px-2 py-5  bg-[var(--surface)] rounded-sm">
      <header className="text-3xl flex gap-3 items-center text-center w-full justify-center">
        <CiUser className="text-blue-400" />
        Update profile
      </header>

      <div className="grid grid-cols-5 lg:text-inherit lg:flex py-3 px-3 border-1 border-[var(--border)] rounded-sm items-center mt-7">
        {userData?.profileImage ? (
          <div className="lg:h-20 h-16 lg:w-20 w-16 overflow-hidden rounded-full relative">
            <Image
              fill
              src={userData?.profileImage}
              alt="profile"
              className=""
            />
          </div>
        ) : (
          <FaUserCircle className="lg:h-20 lg:w-20 h-12 w-12 overflow-hidden rounded-full relative" />
        )}

        <div className="relative col-span-2 w-fit lg:ml-5 ">
          <input
            type="file"
            // accept="image/*"
            id="image"
            {...register("photo")}
            onChange={handleImageChange}
            className="absolute opacity-0 w-28 h-full"
          />
          <label
            htmlFor="image"
            className="text-white bg-blue-700 py-2.5 px-2 mr-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update img
          </label>
        </div>
        <div className="col-span-2">
          <Button
            handler={() =>toast.promise(handleRemoveImage, {
              loading: "Updating...",
              success: <b>profile image removed!</b>,
              error: <b>Could not remove profile image.</b>,
            })}
            type="secondary"
          >
            remove img
          </Button>
        </div>
      </div>

      <div className="border-1 border-[var(--border)] mt-5">
        <UsernameUpdateForm />
        <hr className="text-[var(--border)]" />
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default SettingsForm;
