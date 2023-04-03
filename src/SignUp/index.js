import React, { useState, useEffect } from "react";
import { AiOutlineYahoo } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../API";

const SignUp = () => {
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

  const signupHandler = () => {
    axios({
      url: `${API_URL}/auth/signup`,
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
        if (result.status === 201) {
          alert("회원가입이 완료되었습니다.");
          navigation("/signin");
        }
      })
      .catch((error) => {
        alert("회원가입이 실패하였습니다.");
      });
  };
  return (
    <div>
      <div className="sign-title-wrap">
        <div>
          <AiOutlineYahoo color="#c9d1d9" />
        </div>
        <h5>Sign up to ToDooYa</h5>
      </div>
      <div className="sign-block">
        <span>Email address</span>
        <input name="email" value={email} onChange={onChange} data-testid="email-input" />
        <span>Password</span>
        <input name="password" type="password" value={password} onChange={onChange} data-testid="password-input" />
        <button className={`${disabled ? " disabled" : ""}`} disabled={disabled} onClick={signupHandler} data-testid="signup-button">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
