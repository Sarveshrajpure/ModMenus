import React from "react";
import Nav from "./components/Nav";
import Hero1 from "./components/Hero1";
import Hero2 from "./components/Hero2";

const Home = () => {
  return (
    <div>
      <div className=" ">
        <Nav />
        <Hero1 />
        <Hero2 />
      </div>
    </div>
  );
};

export default Home;
