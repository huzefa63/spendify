'use client';
import Button from "@/app/_ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMyContext } from "./ContextProvider";



const inputStyles =
  "bg-transparent border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-4 py-2";

  function CategoryForm() {
      const { register, handleSubmit,reset } = useForm();
      const {categoryData} = useMyContext();
      const ref = useRef(null);
      const queryClient = useQueryClient();
      const mutate = useMutation({
        mutationFn:onSubmit,
        onSuccess:()=> {
          queryClient.invalidateQueries(["category"]);
          reset({categoryName:''});
        },
      })

      // const { data, isPending, error, isFetching } = useQuery({
      //   queryKey: ["category"],
      //   queryFn: getCategory,
      //   placeholderData: (previousData, previousQuery) => previousData,
      // });

      // async function getCategory(){
      //   const token = localStorage.getItem('token');
      //   try{
      //     const res = await axios.get(
      //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/getCategories`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     // console.log(res.data.categories)
      //     return res.data.categories;
      //   }catch(err){
      //     console.log(err)
      //     return [];
      //   }
      // }

      async function handleAddCategory(data,token){
        try{
         // const formData = new FormData();
         // formData.append('categoryName',data.categoryName);
         const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/createCategory`,{categoryName:data.categoryName},{
           headers:{
             Authorization:`Bearer ${token}`
           }
         })
         if(res.data.status === 'success'){
           toast.success(`added ${data.categoryName} to your categories list`);
           
          //  queryClient.invalidateQueries(['category']);
         }
        }catch(err){
         if(err.response.data.status === 'exists'){
          toast.error(`${data.categoryName} already exists in your category list`)
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
        console.log(data);
        if(res.data.status === 'success'){
          toast.success(`successfully removed from your categories list`);
          // queryClient.invalidateQueries(['category']);
        }
       }catch(err){
        console.log(err);
       }
     
      }

    async function onSubmit(data){
      const token = localStorage.getItem('token');
      if(data.categoryName) await handleAddCategory(data,token);
      if(data.deleteCategory && data.deleteCategory !== 'select category') await handleDeleteCategory(data,token);
    }

    return (
      <div className=" w-full flex justify-center mt-5 ">
        <form
          action=""
          className="w-[95%] bg-[var(--surface)] p-5"
          onSubmit={handleSubmit((data) => mutate.mutate(data))}
        >
          <h1 className="text-3xl text-[var(--text)] pl-5 mb-5">
            Add and Delete Categories
          </h1>
          <div className="grid grid-cols-2 gap-x-15 gap-y-8 px-10 py-3 border-1 border-[var(--border)] rounded-sm">
            <div className="flex flex-col gap-2">
              <label htmlFor="addCategory">add category</label>
              <input
              ref={ref}
                id="addCategory"
                {...register("categoryName")}
                type="text"
                className={inputStyles}
              />
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
                <option className="dark:bg-gray-800">
                  {categoryData?.length > 0 ? "select category" : "no categories found"}
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
            <Button>save changes</Button>
          </div>
        </form>
      </div>
    );
}

export default CategoryForm
