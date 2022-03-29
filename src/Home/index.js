import React from "react";
import Nav from "./components/Nav";
import Hero1 from "./components/Hero1";
import Hero2 from "./components/Hero2";
import Hero3 from "./components/Hero3";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div>
      <div className=" ">
        <Nav isHomePage={true} />
        <Hero1 />
        <Hero2 />
        <Hero3 />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
