import React, { useState, useEffect } from "react";
import { AiOutlineYahoo } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../API";

const SignIn = () => {
  const navigation = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigation("/todo");
    }
  }, []);

  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const signinHandler = () => {
    axios({
      url: `${API_URL}/auth/signin`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        localStorage.setItem("token", "Bearer " + result.data.access_token);
        navigation("/todo");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      signinHandler();
    }
  };
  return (
    <div>
      <div className="sign-title-wrap">
        <div>
          <AiOutlineYahoo color="#c9d1d9" />
        </div>
        <h5>Sign in to ToDooYa</h5>
      </div>
      <div className="sign-block">
        <span>Email address</span>
        <input name="email" value={email} onChange={onChange} data-testid="email-input" />
        <span>Password</span>
        <input name="password" type="password" value={password} onChange={onChange} data-testid="password-input" onKeyDown={onKeyDown} />
        <button className={`${disabled ? " disabled" : ""}`} disabled={disabled} onClick={signinHandler} data-testid="signin-button">
          Sign in
        </button>
      </div>
      <div className="create-account-block">
        <span>New to ToDooYa?</span>
        <a href="signup">Create an account</a>
      </div>
    </div>
  );
};

export default SignIn;
