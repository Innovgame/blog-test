import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Layout } from "antd";
import "./index.less";
import { logout } from "@/redux/auth/actions";

import menu from "./menu";
