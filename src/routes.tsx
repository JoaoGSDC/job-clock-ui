import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import WorkedPointMarker from "./pages/WorkedPointMarker";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/marker" exact component={WorkedPointMarker} />
    </BrowserRouter>
  );
};

export default Routes;
