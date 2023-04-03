import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineYahoo } from "react-icons/ai";

const IntroPage = () => {
  const navigation = useNavigate();
  const buttonHandler = (value) => {
    navigation(`${value}`);
  };
  return (
    <div className="intro-block">
      <AiOutlineYahoo style={{ fontSize: 100 }} color="#ffffff" />
      <h1>hello, this is ToDooYa</h1>
      <button
        onClick={() => {
          buttonHandler("/signin");
        }}
      >
        sign in
      </button>
      <button
        onClick={() => {
          buttonHandler("/signup");
        }}
      >
        sign up
      </button>
    </div>
  );
};

export default IntroPage;
