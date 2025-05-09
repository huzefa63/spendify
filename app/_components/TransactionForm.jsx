import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const inter = Inter({
  variable:'inter',
  subsets:['latin'],
  weight:'600'
})

function TransactionForm({close}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      amount: "",
      type: "expense",
      categoryId: "",
      date: new Date().toISOString().split("T")[0], // default to today
    },
  });

  function submitHandler(data) {
    const transaction = {
      ...data,
      amount: Number(data.amount),
      createdAt: new Date(data.date),
    };
    // onSubmit(transaction);
    console.log(data);
    console.log(new Date(data.date).toISOString());
  }
  const categories = ['Food','Travel','Entertaiment'];

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
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
          <option className="text-black" value="expense">
            Expense
          </option>
          <option className="text-black" value="income">
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
          {...register("category", { required: "Please select a category" })}
          className="w-full p-3 border rounded-lg dark:bg-transparent dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option
              key={i}
              value={i}
              className="text-[var(--text)] bg-[var(--surface)]"
            >
              {cat}
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
        <DatePickerInput />
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

function DatePickerInput(){
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
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(new Date())}
              // label='select date'
              slotProps={inputStyles}
            />
          </LocalizationProvider>
  )
}

export default TransactionForm;
