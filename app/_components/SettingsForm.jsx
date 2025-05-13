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
  const [image, setImage] = useState("");
  // const [user,setUser] = useState({username:'',email:''});
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
    if(!photo) setImage('');
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



  return (
    <div className="w-[95%] p-5  bg-[var(--surface)] rounded-sm">
      <header className="text-3xl flex gap-3 items-center text-center w-full justify-center">
        <CiUser className="text-blue-400" />
        Update profile
      </header>

       <div className="flex gap-6 border-1 border-[var(--border)] py-3 px-5 rounded-sm items-center mt-7">
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
              className="text-white bg-blue-700 py-2.5 px-3 mr-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update image
            </label>
            <Button handler={async ()=>{
              if(!userData?.profileImage) return toast.error('you don not have a profile image to delete');
              if(!confirm('are you sure you want to remove profile image')) return;
              const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profileImage`,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem('token')}`
                },
              })
              if(res.data.status === 'success') queryClient.invalidateQueries(['user']);
            }} type="secondary">remove image</Button>
            {image && (
              <p className="absolute tracking-wider min-w-[50rem]">{image}</p>
            )}
          </div>
        </div>
      

      
      <div className="border-1 border-[var(--border)] mt-5">
        <UsernameUpdateForm />
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

function getValidationFn(getValues,userData,image){
  console.log(image);
  return ({
    username: {
      validate: (val) => {
        if (getValues("password") === "" && !image) {
          if (val === userData?.userName) return "modify username to change it";
        }
        return true;
      },
    },
    password: {
      validate: (val) => {
        if (val === "") return true;
        if (val.length < 8) return "password length should be greater than 7";
        return true;
      },
    },
    passwordConfirm: {
      validate: (val) => {
        if (val === getValues("password")) {
          return true;
        } else {
          return "password not equal";
        }
      },
    },
  });
}

function FormFields({field,error,getValues,userData,register,image}){
  const validation = getValidationFn(getValues,userData,image);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field?.name}>{field?.labelText}</label>
      <div className="relative">
        <input
          defaultValue={field?.name === "username" ? userData?.userName : ""}
          id={field?.name}
          {...register(field?.name, validation[field?.name])}
          type={field?.type}
          className="bg-transparent w-full border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-10 py-2"
          placeholder={field?.placeholder}
        />
        <label
          htmlFor={field?.name}
          className="absolute top-1/2 left-3 -translate-y-1/2"
        >
          {field?.icon}
        </label>
      </div>
      {<p className={`${error[field.name]?.message ? 'opacity-100': 'opacity-0'} text-red-500`}>{error[field?.name]?.message || 'placeholder'}</p>}
    </div>
  );
}

export default SettingsForm;
