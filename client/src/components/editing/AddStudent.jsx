import axios from "axios";
import React from "react";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";

export default function AddStudent(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const hSubmit = (e) => {
    const cookie = new Cookies();
    e.preventDefault();
    const newStudent = {
      firstname: firstName,
      lastname: lastName,
      dob,
      email,
      guardianname: guardianName,
      gender,
      phonenumber: phoneNumber,
    };
    console.log(newStudent);

    axios({
      method: "post",
      url: "http://localhost:3000/api/students/add",
      data: {
        studentObject: newStudent,
      },
      headers: {
        authorization: "Bearerrr " + cookie.get("accesstoken"),
      },
    })
      .then((res) => {
        console.log("post respionse" + res);
      })
      .catch((err) => {
        console.log(err.response.data);
        props.verifyAuth(err.response.data.auth);
      });
  };

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

  const onSubmit = (data) => console.log(data);

  const insertStudent = () => {};

  return (
    <div className="m-4 w-full flex justify-around">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[600px] border-2 p-4 h-[500px]"
      >
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
            name="gender"
            id="gender"
            value={"Male"}
            className="mr-[-20px] text-slate-600"
            // checked={(e) => setGender(e.target.value)}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          Male
          <input
            type="radio"
            name="gender"
            id="gender"
            value={"Female"}
            className="mr-[-20px] text-slate-600"
            // checked={(e) => setGender(e.target.value)}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label className="flex gap-[40px] mt-6 self-center items-center">
          DOB :
          <input
            type="date"
            name="dob"
            id="dob"
            className="h-[30px] w-[250px] justify-center border-0 uppercase cursor-pointer focus:required:invalid:border-red-500 focus:outline-none"
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </label>

        <label
          htmlFor="guardianName"
          className="flex justify-between items-center mt-6"
        >
          Guardian Name :
          <input
            type="text"
            name="guardianName"
            id="guardianName"
            className="border-[1px] h-[35px] w-auto p-2 flex-grow ml-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
            onChange={(e) => setGuardianName(e.target.value)}
            required
          />
        </label>
        <label
          htmlFor="phoneNumber"
          className="flex justify-between items-center mt-6"
        >
          Phone Number :
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="border-[1px] h-[35px] w-auto p-2 flex-grow ml-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <label
          htmlFor="email"
          className="flex justify-between items-center mt-6"
        >
          Email :
          <input
            type="text"
            name="email"
            id="email"
            className="border-[1px] h-[35px] w-auto p-2 flex-grow ml-2 rounded border-black focus:required:invalid:border-red-500 focus:outline-none"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
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
