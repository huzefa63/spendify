'use client';
import { useMyContext } from "@/app/_components/ContextProvider";
import FormFields from "@/app/_components/FormFields";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateUser } from "@/features/userHandlers";
import toast from "react-hot-toast";

export function UsernameUpdateForm() {
    const {data:userData} = useMyContext();
    const {handleSubmit,formState:{errors},register} = useForm({mode:'onSubmit',reValidateMode:'onSubmit'});
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:handleUpdateUser,
        onSuccess: () => queryClient.invalidateQueries(['user']),
      })
      const field = useRef([ 
        {
            labelText:'your email',
            icon:<MdEmail />,
            name:'email',
            disable:true
        },
        
        {
        name: "username",
        labelText: "Change Username",
        icon: <FaUser />,
        placeholder: "Type username",
        register,
        validation:{
            minLength:{
                value:3,
                message:'name should be atleast 3 char long'
            }
        }
      }],)
  
    return (
      <div className="px-10 py-5 w-full  rounded-sm">
        <form
          onSubmit={handleSubmit((data) =>
            toast.promise(
              mutate.mutateAsync({ data, url: "users/updateUser" }),
              {
                loading: "Updating...",
                success: <b>username updated!</b>,
                error: <b>failed to update username!.</b>,
              }
            )
          )}
          className="grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2  lg:gap-x-15 gap-y-0 "
        >
          {field.current.map((el, i) => {
            return (
              <FormFields
                key={i}
                error={errors}
                userData={userData}
                fieldData={el}
              />
            );
          })}
          <span className=" w-fit">
            <Button>update username</Button>
          </span>
        </form>
      </div>
    );
}


export function UpdatePasswordForm(){
    const {
      handleSubmit,
      formState: { errors },
      reset,
      register,
      getValues,
    } = useForm({ mode: "onSubmit" });
    const queryClient = useQueryClient();
    const mutate = useMutation({
      mutationFn:handleUpdateUser,
      onSuccess: () => queryClient.invalidateQueries(['user'])
    })
    const field = useRef([
      {
        labelText: "change password",
        icon: <FaLock />,
        name: "password",
        placeholder:"enter strong password",
        register,
        validation:{
            minLength:{
                value:8,
                message:'password should be atleast 8 char long'
            }
        }
      },

      {
        name: "passwordConfirm",
        labelText: "confirm password",
        icon: <FaLock />,
        placeholder: "repeat password",
        register,
        validation: {
          validate:(val) => {
            if(val === getValues('password')) return true;
            return 'password did not match'
          }
        },
      },
    ]);
    return (
      <div className="px-10 py-5 w-full">
        <form
          onSubmit={handleSubmit((data) => toast.promise(
            mutate.mutateAsync({data,url:'users/updatePassword'}),
             {
               loading: 'Updating...',
               success: <b>password updated!</b>,
               error: <b>failed to update password!.</b>,
             }
           ))}
          className="grid lg:grid-cols-2 gap-x-15 lg:grid-rows-1 grid-rows-2"
        >
          {field.current.map((el, i) => {
            return <FormFields key={i} error={errors} fieldData={el} />;
          })}
          <span className=" w-fit">
            <Button type="secondary">update password</Button>
          </span>
        </form>
      </div>
    );
}