import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInc";
import { toast } from "react-toastify";
import { useState } from "react";

const SignUp = () => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
      shops: [{ name: "" }],
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: "shops"
  });

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const onSubmit = async ({username, password, shops}) => {
    const filteredShops = shops
    .map(shop => shop.name.trim())
    .filter(name => name !== "");

    setLoading(true)

    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        password,
        shops: filteredShops
      });

      if (response.status === 201) {
        toast.success("Signup successful!");
        reset(); 
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="max-w-lg w-full">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold text-white">Create an Account</h2>
          <p className="mt-4 text-center text-gray-400">Sign up to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md">
            
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

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Shop Names (At least 3)
                </label>

                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2">
                    <input
                      {...register(`shops.${index}.name`, {
                        required: index < 3 ? "Shop name is required" : false
                      })}
                      placeholder={`Shop Name ${index + 1}`}
                      className="block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white rounded-md"
                    />
                    {errors.shops?.[index]?.name && (
                      <p className="text-red-400 text-sm">
                        {errors.shops[index].name.message}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => append({ name: "" })}
                  className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  + Add another shop
                </button>
              </div>
            </div>

            <button
            disabled={loading}
              className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md cursor-pointer"
              type="submit"
            >
             {loading ? "Loading..." : "Sign Up"} 
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Already have an account?</span>{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
