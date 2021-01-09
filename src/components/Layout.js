import React from "react";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Navbar />
    {children}
    <div style={{ marginBottom: "50px" }} />
  </React.Fragment>
);

export default Layout;
