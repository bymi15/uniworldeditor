import React, { Fragment } from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Layout>
              <Home {...props} />
            </Layout>
          )}
        />
        <Route
          exact
          path="/about"
          render={(props) => (
            <Layout>
              <About {...props} />
            </Layout>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default App;
