import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInc";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    }
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ username, password, remember }) => {
    setLoading(true);
  
    try {
      const response = await axiosInstance.post("/users/login", { username, password, remember });
  
      if (response.status === 200) {
        const { token, user } = response.data;
       
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        toast.success("Login successful!");
        reset();
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg w-full">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-white"> Welcome Back</h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md ">
       
              <input
                placeholder="username"
                {...register("username", { required: "Name is required" })}
                className="block w-full px-3 py-2 mt-2 border border-gray-700 bg-gray-700 text-white rounded-md"
              />
              {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}

              <input
                placeholder="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message: "Password must contain a number and a special character"
                  }
                })}
                className="block w-full px-3 py-2 mt-4 border border-gray-700 bg-gray-700 text-white rounded-md"
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
     
              <div className="flex items-center mt-4">
                <input
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                  {...register("remember")}
                  name="remember"
                  id="remember-me"
                />
                <label
                  className="ml-2 block text-sm text-gray-400"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              
            </div>

            <button
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md cursor-pointer"
              type="submit"
            >
               {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Don't have an account?</span>{" "}
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
