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

const InputFields = [
  {
    name: "username",
    labelText: "Change Username",
    icon: <FaUser className="text-purple-600" />,
    placeholder: "Type username",
    type:'text',
  },
  {
    name: "password",
    labelText: "Change Password",
    icon: <FaLock className="text-blue-600" />,
    placeholder: "Type a Strong Password",
    type:'password',
  },
  {
    name: "passwordConfirm",
    labelText: "Repeat Password",
    icon: <FaLock className="text-blue-600" />,
    placeholder: "Type Password Again",
    type:'password',
  },
];
function SettingsForm() {
  const { register, handleSubmit,formState:{errors},getValues } = useForm({mode:'onSubmit'});
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

      // toast.success("profile updated");
      return true;
    } else{
      return false;
    }
  }

  async function onSubmit(data) {
    const token = localStorage.getItem('token');
  await handleUpdateNameAndImage(data,token);
  }

  async function deleteImage() {
    const token = localStorage.getItem('token');
   try{
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profileImage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          imageUrl: userData.profileImage,
        },
      }
    );
    if(res.data.status === 'success'){
      queryClient.invalidateQueries(['user']);
      toast.success('profile image removed!');
    }
   }
  catch(err){
    toast.error('failed to delete image, please try again!');
  } 
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
      className="w-[95%] py-5 lg:px-5 px-2 h-[95%] bg-[var(--surface)] rounded-sm"
      onSubmit={handleSubmit((data) => {
        toast.promise(mutate.mutateAsync(data), {
          loading: "Updating...",
          success: <b>Profile updated!</b>,
          error: <b>Could not update profile.</b>,
        });
      })}
    >
      <header className="text-3xl pl-5 flex gap-3 items-center">
        <CiUser className="text-blue-400" />
        Update profile
      </header>

      <div className="flex gap-6 border-1 border-[var(--border)] py-3 px-5 rounded-sm items-center mt-7">
        {userData?.profileImage ? (
          <div className="lg:h-20 h-12 lg:w-20 w-12 overflow-hidden rounded-full relative">
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

        <div className="relative w-full">
          <input
            type="file"
            accept="image/*"
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
          <Button type="secondary" buttonType={'button'} handler={deleteImage}>remove image</Button>
          {image && (
            <p className="absolute tracking-wider min-w-[50rem]">{image}</p>
          )}
        </div>
      </div>

      <main className="w-full border-1 border-[var(--border)]  mt-5 grid lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-x-15 gap-y-2 lg:px-10 px-5 py-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">email</label>
          <div className="relative">
            <input
              disabled={true}
              value={userData?.email || ""}
              id="email"
              type="text"
              className={`bg-transparent w-full border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-10 py-2 hover:cursor-not-allowed`}
            />
            <label
              htmlFor="email"
              className="absolute top-1/2 left-3 -translate-y-1/2"
            >
              <MdEmail className="text-purple-600" />
            </label>
          </div>
        </div>

        {InputFields.map((el,i) => {
          return <FormFields key={i} field={el} image={image} getValues={getValues} error={errors} register={register} userData={userData}/>
        })}

        <span className="relative w-fit transition-all duration-300">
          <Button>
            {mutate.isPending && (
              <ImSpinner9 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}

            <span className={`${mutate.isPending ? "opacity-0" : ""}`}>
              save changes
            </span>
          </Button>
        </span>
      </main>
    </form>
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
