import React, { Component } from "react";
import axios from "@/lib/axios";
import { Button, message } from "antd";

class Home extends Component {
  test = () => {
    axios
      .post("/examples/test")
      .then(res => {
        message.success(res);
      })
      .catch(err => message.error(err));
  };

  test2 = () => {
    localStorage.clear();
    message.success("clear token");
  };

  render() {
    return (
      <div>
        <Button onClick={this.test}>click</Button>
        <Button onClick={this.test2}>clear local</Button>
      </div>
    );
  }
}

export default Home;
