import app from "./app";
import React, { Fragment } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";

export default () => {
  const volume = useStoreState(state => state.volume.level);
  const updateVolume = useStoreActions(
    actions => (actions as any).volume.change
  );

  return (
    <Fragment>
      <div
        ref={nodeElement => {
          nodeElement && nodeElement.appendChild(app.view);
        }}
      ></div>
      <div style={{ position: "absolute", bottom: "0px", right: "0px" }}>
        <button onClick={() => updateVolume(5)}>{volume}</button>
      </div>
    </Fragment>
  );
};
