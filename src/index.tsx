import React from "react";
import { render } from "react-dom";
import Game from "./game";

const launch = () => {
  let element = document.getElementById("root");

  if (element) {
    render(<Game />, element);
  } else {
    setTimeout(launch, 50);
  }
};

launch();
