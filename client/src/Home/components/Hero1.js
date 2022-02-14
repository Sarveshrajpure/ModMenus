import React from "react";
import Typical from "react-typical";
import mockup from "../../assests/mockup.png";
import { useNavigate } from "react-router-dom";
import "./Hero1.css";

const Hero1 = () => {
  const navigate = useNavigate();

  const navigateTo = async () => {
    navigate("/register");
  };
  return (
    <div className="hero1Wrapper">
      <div
        className="textAnimationBlock  px-8 py-6
      
      lg:px-10 lg:py-10 lg:flex justify-between
      items-center
      "
      >
        <div className="text-3xl  md:text-4xl  lg:text-5xl">
          <p>Create your easy to </p>

          <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Implement 💻", 1800, "Access 🤳", 1800]}
            className="typingTxt"
          />
          <p> mobile menu in less than a minute!</p>

          <div
            className="createMenuBtn    mt-4   text-2xl   md:text-3xl md:mt-6  lg:text-3xl md:mt-10"
            onClick={() => {
              navigateTo();
            }}
          >
            Create Menu
          </div>
        </div>
        <div>
          <img className="mockimg" src={mockup} alt="mockup" />
        </div>
      </div>
    </div>
  );
};
export default Hero1;
