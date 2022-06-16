import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Login(props) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const response = axios
        .post("http://localhost:3000/api/users/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.auth) {
            props.auth(true);
            props.showLogin(false);
            props.user(res.data);
            setSuccess(res.data.auth);
            console.log(res.headers);
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {user ? (
        <div className="home">
          <span>
            Welcome to the <b>{user.isAdmin ? "admin" : "user"}</b> dashboard{" "}
            <b>{user.username}</b>.
          </span>
        </div>
      ) : (
        <div className="login">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-1"
          >
            <span className="formTitle font-semibold">Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 p-1"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 p-1"
            />
            <button
              type="submit"
              className="submitButton border-2 px-2 py-1 bg-slate-300"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
