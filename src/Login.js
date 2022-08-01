import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="loginpage">
      <div className="data">
        <input type="text" placeholder="type Your name" />

        <Link to="/about">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
