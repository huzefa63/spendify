import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useMyContext } from "./ContextProvider";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const inter = Inter({
  variable:'inter',
  subsets:['latin'],
  weight:'600'
})

function TransactionForm({close}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = new QueryClient();
  const mutate = useMutation({
    mutationFn:submitHandler,
    onSuccess:()=> queryClient.invalidateQueries(['transactions'])
  })

  const {categoryData} = useMyContext();

  async function submitHandler(data) {
    const token = localStorage.getItem('token');
    if(!token) return;
    const transaction = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date),
    };

    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/createTransaction`,transaction,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(res.data.status === 'success'){
        toast.success("transaction entry created!");
        return true;
      } 
    }catch(err){
      toast.error('unable to create transaction entry, please try agian');
      return false;
    }
    
  }
  const categories = ['Food','Travel','Entertaiment'];

  return (
    <form
      onSubmit={handleSubmit((data)=>mutate.mutate(data))}
      className={`bg-white dark:bg-[var(--surface)] relative border border-[var(--border)] max-w-xl h-[80%] w-full  px-8 py-2  rounded-2xl shadow-lg space-y-4 ${inter.className}`}
    >
      {/* Close Button */}
      <IoMdClose
        onClick={close}
        className={`text-[var(--text)] absolute right-6 top-6 text-2xl cursor-pointer transition hover:scale-110 ${
          document.documentElement.classList.contains("dark")
            ? "hover:bg-gray-700"
            : "hover:bg-gray-200"
        } p-1 rounded-full`}
      />

      <h2 className="text-2xl font-bold text-center text-[var(--text)]">
        Add Transaction Entry
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-1 text-[var(--text)] font-medium">
          Title
        </label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full p-3 border rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. Grocery shopping"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 text-[var(--text)] font-medium">
          Amount
        </label>
        <input
          type="number"
          {...register("amount", { required: "Amount is required" })}
          className="w-full p-3 border rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. 500"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 text-[var(--text)] font-medium">
          Type
        </label>
        <select
          {...register("transactionType")}
          className="w-full p-3 border rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option className="dark:bg-gray-800" value="expense">
            Expense
          </option>
          <option className="dark:bg-gray-800" value="income">
            Income
          </option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 text-[var(--text)] font-medium">
          Category
          <span className="ml-1 text-gray-400 font-normal text-sm">
            (add more in{" "}
            <Link href="/settings" className="text-blue-500 underline">
              Settings
            </Link>
            )
          </span>
        </label>
        <select
        disabled={categoryData.length < 1}
          {...register("category", { required: "Please select a category" })}
          className="w-full p-3 disabled:cursor-not-allowed border rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value='' className="dark:bg-gray-800">{ categoryData.length > 0 ? 'Select Category':'please create category from settings'}</option>
          {categoryData?.map((cat, i) => (
            <option
              key={i}
              value={cat?.categoryName}
              className="text-[var(--text)] dark:bg-gray-800"
            >
              {cat.categoryName}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 text-[var(--text)] font-medium">
          Date
        </label>
        <DatePickerInput control={control}/>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={close}
          className={`px-4 py-2 border rounded-lg text-[var(--textDark)] transition hover:scale-105 ${
            document.documentElement.classList.contains("dark")
              ? "border-gray-600 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-200"
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

function DatePickerInput({control}){
  const inputStyles = {
    textField: {
      size: "small",
      InputProps: {
        style: {
          width:'100%',
          color: "var(--text)", // Input text color
          border: "1px solid var(--border)",
        },
        sx: {
          svg: {
            color: "var(--text)", // Calendar icon color
          },
        },
      },
      InputLabelProps: {
        style: {
          color: "var(--text)", // Label color
        },
      },
    },
  }
  return (
    <Controller
      name="date"
      control={control}
      defaultValue={dayjs(new Date())}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            
            slotProps={inputStyles}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default TransactionForm;
