import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const onSubmit = (data, r) => {
    const email = data.email;
    const password = data.password;
    auth.signin(email, password);
    r.target.reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-tr from-indigo-500 to-green-400 w-full h-screen grid place-items-center"
      >
        <div className="lg:w-1/3 w-11/12 h-1/2 border-2 border-white rounded-2xl grid place-items-center">
          <img className="logo" src="" alt="Restaurant" />
          <h2 className="uppercase text-center text-xl text-white font-ubuntu">
            Login
          </h2>
          <input
            className="h-12 rounded-lg p-2 focus:outline-none placeholder-indigo-900"
            name="email"
            placeholder="E-mail"
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email?.type === "required" && (
            <span>Your email is required</span>
          )}
          {errors.email?.type === "pattern" && (
            <span>Please write proper email</span>
          )}
          <input
            className="h-12 rounded-lg p-2 focus:outline-none placeholder-indigo-900"
            name="password"
            type="password"
            placeholder="Password"
            ref={register({
              required: true,
            })}
          />
          {errors.school?.type === "required" && (
            <span>Your password is required</span>
          )}
          <button
            type="submit"
            className="bg-green-500 w-20 h-12 rounded-xl text-lg uppercase text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
