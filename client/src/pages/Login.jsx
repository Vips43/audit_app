import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuthQuery";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// 🚨 Removed the ProtectedRoute import!

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutateAsync: loginAsync, isPending } = useLogin();

  const submit = async (data) => {
    try {
      // 1. Wait for the login attempt to finish
      await loginAsync(data);

      // 2. Only run these if the login was successful!
      navigate("home");
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="content-center h-full w-full bg-gray-200">
      <form
        onSubmit={handleSubmit(submit)}
        className="mx-auto outline outline-gray-400 shadow-lg max-w-2xs rounded bg-white p-5 *:flex *:flex-col "
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        {/* 🚨 Removed <ProtectedRoute /> from here! */}

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
            disabled={isPending}
            className="outline px-2 py-1 w-fit mx-auto my-2 rounded bg-blue-600 text-white hover:bg-blue-500 active:scale-95 transition-transform disabled:bg-blue-400"
          >
            {isPending ? "Logging in..." : "Login"}
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
      {/* Fixed: htmlFor should match the input's id for accessibility */}
      <label htmlFor={id} className="capitalize font-semibold text-gray-600">
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
