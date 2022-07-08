import axios from "axios";
import React from "react";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddStudent(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const Input = ({ label, name, register, required }) => {
    return (
      <>
        <label className="flex justify-between mt-6 items-center">
          {label}
          <input
            className="border-[1px] flex-grow ml-2 h-[35px] w-[250px] p-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
            {...register(name, { required })}
          />
        </label>
      </>
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    const cookie = new Cookies();
    axios({
      method: "post",
      url: "http://localhost:3000/api/students/addv2",
      data: {
        studentObject: data,
      },
      headers: {
        authorization: "Bearerrr " + cookie.get("accesstoken"),
      },
    })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
          props.verifyAuth(err.response.data.auth);
        } else {
          console.log("erorr");
        }
      });
  };

  return (
    <div className="m-4 w-full flex justify-around">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[600px] border-2 p-4 h-[500px]"
      >
        {(errors?.firstName?.type ||
          errors?.lastName?.type ||
          errors?.gender?.type ||
          errors?.dob?.type ||
          errors?.guardianName?.type ||
          errors?.phoneNumber?.type ||
          errors?.email?.type) === "required" && (
          <p className="text-red-500">Enter All the fields</p>
        )}
        <Input
          label="First Name: "
          name="firstName"
          register={register}
          required
        />
        <Input
          label="Last Name: "
          name="lastName"
          register={register}
          required
        />
        <label className="flex gap-[50px] mt-6 self-center">
          <input
            type="radio"
            className="mr-[-20px]"
            value="Male"
            {...register("gender", { required: true })}
          />
          Male
          <input
            type="radio"
            className="mr-[-20px] "
            value="Female"
            {...register("gender", { required: true })}
          />
          Female
        </label>
        <label className="flex gap-[40px] mt-6 self-center w-full items-center ">
          DOB :
          <input
            className="h-[30px] border-[1px] w-[250px] justify-center  uppercase cursor-pointer focus:required:invalid:border-red-500 focus:outline-none"
            type="text"
            {...register("dob", {
              required: false,
              min: "01-01-1990",
              max: "01-01-2000",
            })}
          />
        </label>
        <Input
          label="Guardian Name: "
          name="guardianName"
          register={register}
          required
        />
        <label
          htmlFor="phoneNumber"
          className="flex justify-between items-center mt-6"
        >
          Phone Number :
          <input
            type="text"
            className="border-[1px] h-[35px] w-auto p-2 flex-grow ml-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
            {...register("phoneNumber", { required: true, maxLength: 10 })}
          />
        </label>
        <label
          htmlFor="email"
          className="flex justify-between items-center mt-6"
        >
          Email :
          <input
            {...register("email", {
              required: true,
              pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
            })}
            className="border-[1px] h-[35px] w-auto p-2 flex-grow ml-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
          />
          {errors?.email?.type === "pattern" && (
            <p className="text-red-500">Enter Valid Email</p>
          )}
        </label>

        <label htmlFor="class" className="flex gap-4 items-center mt-6">
          Class:
          <select defaultValue={1} {...register("class", { required: true })}>
            <option value={1}>A</option>
            <option value={2}>B</option>
          </select>
        </label>
        <button
          type="submit"
          // onClick={hSubmit}
          //   onSubmit={handleSubmit}
          className="p-2 bg-gradient-to-b rounded mt-2 from-slate-400 to-slate-300 hover:from-slate-300 hover:to-slate-400"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}
