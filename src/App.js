import React from "react";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import EventRooms from "./pages/EventRooms";
import CreateEventRoom from "./pages/CreateEventRoom";
import EditEventRoom from "./pages/EditEventRoom";
import LectureRooms from "./pages/LectureRooms";

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="/uniworldeditor">
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
          path="/eventrooms"
          render={(props) => (
            <Layout>
              <EventRooms {...props} />
            </Layout>
          )}
        />
        <Route
          exact
          path="/eventrooms/:id"
          render={(props) => (
            <Layout>
              <EventRooms {...props} />
            </Layout>
          )}
        />
        <Route
          exact
          path="/create"
          render={(props) => (
            <Layout>
              <CreateEventRoom {...props} />
            </Layout>
          )}
        />
        <Route
          exact
          path="/edit"
          render={(props) => (
            <Layout>
              <EditEventRoom {...props} />
            </Layout>
          )}
        />
        <Route
          exact
          path="/lecturerooms"
          render={(props) => (
            <Layout>
              <LectureRooms {...props} />
            </Layout>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
