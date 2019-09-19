import app from "./app";
import React, { Fragment } from "react";

import { useStoreState, useStoreActions } from "easy-peasy";
import SoundPlayer from "./sound-player";

export default () => {
  const volume = useStoreState(state => state.volume.level);
  const updateVolume = useStoreActions(
    actions => (actions as any).volume.change
  );

  newSoundPlayer(volume);

  return (
    <Fragment>
      <div
        ref={nodeElement => {
          nodeElement && nodeElement.appendChild(app.view);
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <span style={{ color: "white", marginBottom: "8px" }}>Volume</span>
        <div>
          <button onClick={() => updateVolume(0.1)}>+</button>
          <button
            style={{ marginLeft: "8px" }}
            onClick={() => updateVolume(-0.1)}
          >
            -
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const newSoundPlayer = (volume: number) => {
  SoundPlayer.ship.stop();
  SoundPlayer.ship.play({ loop: true, volume });
};
