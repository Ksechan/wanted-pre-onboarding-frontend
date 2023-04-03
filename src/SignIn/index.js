import React, { useState, useEffect } from "react";
import { AiOutlineYahoo } from "react-icons/ai";

const SignIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

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
        <input
          name="email"
          value={email}
          onChange={onChange}
          data-testid="email-input"
        />
        <span>Password</span>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          data-testid="password-input"
        />
        <button
          className={`${disabled ? " disabled" : ""}`}
          disabled={disabled}
          onClick={() => {
            console.log("asdf");
          }}
          data-testid="signin-button"
        >
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
