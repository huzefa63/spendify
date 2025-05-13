function FormFields({fieldData,userData,error}) {
    const username = userData?.userName || '';
    const email = userData?.email || '';
    return (
      <div className="flex flex-col gap-2 ">
        <label htmlFor={fieldData?.name}>{fieldData?.labelText}</label>
        <div className="relative">
          <input
            disabled={fieldData?.disable}
            defaultValue={
              (fieldData?.name === "username" && username) ||
              (fieldData?.name === "email" && userData?.email) ||
              ""
            }
            id={fieldData?.name}
            {...fieldData?.register?.(fieldData?.name, fieldData?.validation)}
            type={fieldData?.type}
            className="bg-transparent w-full border disabled:cursor-not-allowed border-gray-500 col-span-2 placeholder:text-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm px-10 py-2"
            placeholder={fieldData?.placeholder}
          />
          <label
            htmlFor={fieldData?.name}
            className="absolute top-1/2 left-3 -translate-y-1/2"
          >
            {fieldData?.icon}
          </label>
        </div>
        <p className={`text-red-500 ${error[fieldData?.name]?.message ? 'opacity-100':'opacity-0'}`}>
          {error[fieldData?.name]?.message
            ? error[fieldData?.name]?.message
            : "placeholder"}{" "}
        </p>
      </div>
    );
}

export default FormFields
