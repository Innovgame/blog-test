import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "antd";
import initName from "@/redux/app-name/actions";
import { incrementCount, decrementCount } from "@/redux/counter-demo/actions";

const mapStateToProps = state => {
  return { count: state.count, appName: state.appName };
};

const mapDispatchToProps = dispatch => {
  return {
    initName: name => dispatch(initName(name)),
    increment: () => dispatch(incrementCount()),
    decrement: () => dispatch(decrementCount())
  };
};
class CounterDemo extends React.Component {
  sayHello = () => {
    this.props.initName("Hello React");
  };

  render() {
    return (
      <div>
        <p>
          <span>{this.props.appName}</span>
          <Button type="primary" onClick={this.sayHello}>
            hello
          </Button>
        </p>
        <p>
          <Button type="primary" onClick={this.props.increment}>
            +
          </Button>
          <span>Count: {this.props.count}</span>
          <Button type="primary" onClick={this.props.decrement}>
            -
          </Button>
        </p>
      </div>
    );
  }
}

CounterDemo.propTypes = {
  count: PropTypes.number,
  appName: PropTypes.string,
  initName: PropTypes.func,
  increment: PropTypes.func,
  decrement: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterDemo);
