'use client';
import Button from "@/app/_ui/Button";
import { useForm } from "react-hook-form";



const inputStyles =
  "bg-transparent border border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-4 py-2";

  function CategoryForm() {
      const { register, handleSubmit } = useForm();
    
    return (
      <div className=" w-full flex justify-center mt-5 ">
        <form action="" className="w-[95%] bg-[var(--surface)] p-5 ">
          <h1 className="text-3xl text-[var(--text)] pl-5 mb-5">
            Add and Delete Categories
          </h1>
          <div className="grid grid-cols-2 gap-x-15 gap-y-8 px-10 py-3 border-1 border-[var(--border)] rounded-sm">
            <div className="flex flex-col gap-2">
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
              <select name="" id="" className={inputStyles} {...register("deleteCategory")}>
                <option value="">select category</option>
              </select>
            </div>
            <Button>save changes</Button>
          </div>
        </form>
      </div>
    );
}

export default CategoryForm
