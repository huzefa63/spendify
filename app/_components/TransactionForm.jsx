import { useForm } from "react-hook-form";

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
      className="bg-white border-[var(--border)] border-1 dark:bg-[var(--surface)] w-1/2  p-6 rounded-lg shadow-md   space-y-4"
    >
      <h2 className="text-xl text-center font-semibold dark:text-white">
        Add Transaction
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-1 text-[var(--text)] text-sm">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-600 dark:text-white"
          placeholder="e.g. Grocery shopping"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 text-[var(--text)] text-sm">Amount</label>
        <input
          type="number"
          {...register("amount", { required: "Amount is required" })}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-600 dark:text-white"
          placeholder="e.g. 500"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 text-[var(--text)] text-sm">Type</label>
        <select
          {...register("transactionType")}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-600 text-white"
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
        <label className="block mb-1 text-[var(--text)] text-sm">
          Category
        </label>
        <select
          {...register("category", { required: "Please select a category" })}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-600 dark:text-white"
        >
          <option
            className="text-[var(--text)] bg-[var(--background)]"
            value=""
          >
            Select Category
          </option>
          {categories.map((cat, i) => (
            <option
              className="text-[var(--text)] bg-[var(--surface)] border-b-1 border-[var(--border)]"
              key={i}
              value={i}
            >
              {cat}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 text-[var(--text)] text-sm">Date</label>
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full p-2 border rounded dark:bg-transparent dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="ml-auto w-fit flex gap-2">
        <button
        onClick={close}
          type='button'
          className="text-white border border-[var(--border)] px-4 py-2 rounded hover:bg-gray-800 transition-all duration-300 hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-all duration-300 hover:cursor-pointer"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
