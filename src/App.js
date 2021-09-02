import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        name="email"
        type="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && errors.email.type === "required" && (
        <p>This name field is required</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>This email do not format valid, must contain @</p>
      )}

      <label>Name</label>
      <input name="name" ref={register({ required: true, maxLength: 10 })} />
      {errors.name && errors.name.type === "required" && (
        <p>This name field is required</p>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <p>Your input exceed maxium length</p>
      )}

      <label>Password</label>
      <input
        name="password"
        type="password"
        ref={register({ required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>This name field is required</p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p>Password must have at least 6 characters</p>
      )}

      <label>Password Confirm</label>
      <input
        name="password_confirm"
        type="password"
        ref={register({
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      {errors.password_confirm &&
        errors.password_confirm.type === "required" && (
          <p>This password confirm field is required</p>
        )}
      {errors.password_confirm &&
        errors.password_confirm.type === "validate" && (
          <p>The passwords do not match</p>
        )}

      <input type="submit" style={{ marginTop: "40px" }} />
    </form>
  );
}

export default App;
