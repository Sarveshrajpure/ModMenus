import React from "react";
import Nav from "./components/Nav";
import Hero1 from "./components/Hero1";

const Home = () => {
  return (
    <div>
      <div className="px-2 py-2 md:px-20 md:py-6 lg:px-32 lg:py-8">
        <Nav />
        <Hero1 />
      </div>
    </div>
  );
};

export default Home;
