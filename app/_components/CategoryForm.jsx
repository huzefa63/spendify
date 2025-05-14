'use client';
import Button from "@/app/_ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMyContext } from "./ContextProvider";
import { FaEdit } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";

const inputStyles =
  "bg-transparent border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-5 py-2";

  function CategoryForm() {
      const { register, handleSubmit,resetField } = useForm();
      const {categoryData} = useMyContext();
      const ref = useRef(null);
      const queryClient = useQueryClient();
      const mutate = useMutation({
        mutationFn:onSubmit,
        onSuccess:()=> {
          queryClient.invalidateQueries(["category"]);
          resetField('categoryName');
          resetField('deleteCategory')
        },
        onError:(err)=>alert(err,'failed category')
      })

      async function handleAddCategory(data,token){
        try{
         // const formData = new FormData();
         // formData.append('categoryName',data.categoryName);
         console.log('from add',data);
         const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/createCategory`,{categoryName:data.categoryName},{
           headers:{
             Authorization:`Bearer ${token}`
           }
         })
         if(res.data.status === 'success'){
           toast.success(`added ${data.categoryName} to your categories list`);
          queryClient.invalidateQueries(['category']);
          //  return Promise.resolve();
         }
        }catch(err){
         if(err.response.data.status === 'exists'){
          console.log(err)
          toast.error(`${data.categoryName} already exists in your category list`)
          // return Promise.reject();
         }
        } 
      }

      async function handleDeleteCategory(data,token){
        // if(data.deleteCategory === 'select category') return;
        
       try{
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/deleteCategory`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              categoryId: data.deleteCategory,
            },
          }
        );
        // console.log(data);
        if(res.data.status === 'success'){
          toast.success(`category deleted successfully`);
          queryClient.invalidateQueries(['category']);
          // return Promise.resolve();
        }
       }catch(err){
        console.log(err);
        // return Promise.reject();
       }
     
      }

    async function onSubmit(data){
      const token = localStorage.getItem('token');
      // if(data.categoryName) handleAddCategory(data,token);
      if(data.deleteCategory && data.deleteCategory !== 'select category') handleDeleteCategory(data, token)
      
    
      if(data.categoryName) handleAddCategory(data, token)
       
      // if(data.deleteCategory && data.deleteCategory !== 'select category') toast.promise(handleDeleteCategory(data, token), {
      //   loading: "Saving...",
      //   success: <b>{`removed from your categories list!`}</b>,
      //   error: <b>{`failed to remove to your list`}.</b>,
      // });
}

    return (
      <div className=" w-full flex justify-center mt-5 ">
        <form
          action=""
          className="w-[95%] bg-[var(--surface)] py-5 lg:px-5 px-2"
          onSubmit={handleSubmit((data) => mutate.mutate(data))}
        >
          <h1 className="lg:text-3xl text-xl text-[var(--text)] pl-5 mb-5 flex gap-2 items-center">
            <FaEdit className="text-blue-400" />
            Add and Delete Categories
          </h1>
          <div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-x-15 gap-y-8 px-10 py-3 border-1 border-[var(--border)] rounded-sm">
            <div className="flex flex-col gap-2">
              <label htmlFor="addCategory">add category</label>
              <div className="relative">
                <input
                  ref={ref}
                  placeholder="food, clothes, grocery, rent, etc"
                  id="addCategory"
                  {...register("categoryName")}
                  type="text"
                  className={`${inputStyles} px-10 w-full`}
                />
                <label htmlFor="addCategory" className="absolute text-[var(--text)] left-3 top-1/2 -translate-y-1/2">
                  <FaRegListAlt className="text-purple-500"/>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="deleteCategory">delete category</label>
              <select
                disabled={categoryData?.length < 1}
                name=""
                id=""
                className={`${inputStyles} disabled:cursor-not-allowed`}
                {...register("deleteCategory")}
              >
                <option className="dark:bg-gray-800" value="">
                  {categoryData?.length > 0
                    ? "select category"
                    : "no categories found"}
                </option>
                {categoryData?.map((el, i) => {
                  return (
                    <option key={i} value={el._id} className="dark:bg-gray-800">
                      {el.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button type="secondary">save changes</Button>
          </div>
        </form>
      </div>
    );
}

export default CategoryForm
