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
        className="textAnimationBlock  
      
       lg:flex justify-between
      items-center
      "
      >
        <div className="text-4xl  md:text-3xl  lg:text-4xl   px-2 py-4  lg:px-20  ">
          <p>Create your easy to </p>

          <Typical
            loop={Infinity}
            wrapper="b"
            steps={["Implement 💻", 1800, "Access 🤳", 1800]}
            className="typingTxt"
          />
          <p> mobile menu in less than 10 minutes!</p>

          <div
            className="createMenuBtn    mt-6   text-2xl   md:text-2xl md:mt-6  lg:text-2xl md:mt-10"
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
