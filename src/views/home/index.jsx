import React from "react";
import axios from "@/lib/axios";

const Home = () => {
  axios.request("/hello");
  return <div>welcome home page</div>;
};

export default Home;
