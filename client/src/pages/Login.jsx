import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuthQuery";
import ProtectedRoute from "./ProtectedRoute";
import { toast } from "react-toastify";

function Login() {
  const { register, handleSubmit } = useForm();

  const { mutate: login, isPending, isError } = useLogin();

  const submit = async (data) => {
    console.log(data);
    await login(data);
    toast.success("loggin success")
  };
  return (
    <div className="content-center h-dvh w-full bg-gray-200">
      <form
        onSubmit={handleSubmit(submit)}
        className="mx-auto outline outline-gray-400 shadow-lg max-w-2xs rounded bg-white p-5 *:flex *:flex-col "
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>
        <ProtectedRoute />
        <InputRow
          id={"email"}
          label={"email"}
          register={register}
          type={"email"}
          required={true}
        />

        <InputRow
          id={"pass"}
          label={"password"}
          register={register}
          type={"password"}
          required={true}
        />
        <div>
          <button
            type="submit"
            className="outline px-2 py-1 w-fit mx-auto my-2 rounded bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-transform"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

function InputRow({ label, register, type, id, required = false }) {
  return (
    <div className="mb-1">
      <label htmlFor={label} className="capitalize font-semibold text-gray-600">
        {label}
        <span className={`${required ? "text-red-600" : ""}`}>*</span>
      </label>
      <input
        type={type}
        id={id}
        {...register(label, { required: required })}
        className="outline outline-gray-400 rounded max-w-3xs px-2 py-1"
      />
    </div>
  );
}
