import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userFormSchema from "~/validation/formSchema";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data) => {
    const res = await axios.post("/api/create-user", data);
    if (res.status === 201) {
      reset();
      setSuccessMessage("User created successfully");
    }
  };

  return (
    <main className="bg-slate-800 text-slate-100 h-screen flex flex-col gap-12 justify-center items-center">
      <h1 className="text-2xl">Welcome to my site!</h1>
      <form
        className="w-[300px] flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl">Please complete this form</h1>
        <input
          className="p-4 rounded-md font-semibold text-lg text-slate-600"
          type="text"
          placeholder="First Name"
          {...register("firstName")}
        />
        <p>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </p>
        <input
          className="p-4 rounded-md font-semibold text-lg text-slate-600"
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
        />
        <p>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </p>
        <button
          className="border py-2 rounded-md hover:bg-slate-50 hover:text-slate-800"
          type="submit"
        >
          Submit
        </button>
      </form>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md">
          {successMessage}
        </div>
      )}
    </main>
  );
}
