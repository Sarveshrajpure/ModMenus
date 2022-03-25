import React from "react";
import Nav from "./components/Nav";
import Hero1 from "./components/Hero1";
import Hero2 from "./components/Hero2";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div>
      <div className=" ">
        <Nav />
        <Hero1 />
        <Hero2 />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
