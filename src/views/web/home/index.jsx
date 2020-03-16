import React from "react";
import axios from "@/lib/axios";

const Home = () => {
  axios
    .request("/")
    .then(res => console.info(res))
    .catch(err => console.error(err));
  return <div>welcome home page</div>;
};

export default Home;
