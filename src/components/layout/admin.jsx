import React, { Component } from "react";

import PropTypes from "prop-types";

class AdminLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="Admin">
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default AdminLayout;
