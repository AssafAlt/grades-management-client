import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterPayload } from "../../models/AuthPayloads";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>();

  const navigate = useNavigate();

  const { registerApi } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  //Validators
  const firstNameValidation = {
    required: "First Name is required",
  };

  const lastNameValidation = {
    required: "Last Name is required",
  };

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Entered value does not match email format",
    },
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  };

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    setIsLoading(true);
    try {
      await registerApi(data);
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error("Register Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName", firstNameValidation)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", lastNameValidation)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="user@email.com"
              {...register("email", emailValidation)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="your password"
              {...register("password", passwordValidation)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already registered?
          <Link to="/" className="ml-1 text-blue-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
