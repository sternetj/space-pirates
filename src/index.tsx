import React from "react";
import { render } from "react-dom";
import Game from "./game";

import { createStore, action, StoreProvider } from "easy-peasy";

const store = createStore({
  volume: {
    level: 0.3,
    change: action((state, payload) => {
      (state as any).level += payload;
    })
  }
});

const launch = () => {
  let element = document.getElementById("root");

  if (element) {
    render(
  <StoreProvider store={store}>
    <Game />
  </StoreProvider>,
  element
);
  } else {
    setTimeout(launch, 50);
  }
}

launch()
