import app from "./app";
import React, { Fragment, useState } from "react";

import SoundPlayer from "./sound-player";

import Button from "@atlaskit/button";
import VidVolumeMutedIcon from "@atlaskit/icon/glyph/vid-volume-muted";
import VidVolumeFullIcon from "@atlaskit/icon/glyph/vid-volume-full";

export default () => {
  const [isMuted, setIsMuted] = useState(false);

  newSoundPlayer(isMuted);

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
          bottom: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Button
          onClick={() => setIsMuted(prev => !prev)}
          appearance="primary"
          style={{ marginBottom: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>Volume</span>{" "}
            {isMuted ? (
              <VidVolumeMutedIcon size="medium" label="" />
            ) : (
              <VidVolumeFullIcon size="medium" label="" />
            )}
          </div>
        </Button>
      </div>
    </Fragment>
  );
};

const newSoundPlayer = (isMuted: boolean) => {
  isMuted
    ? SoundPlayer.ship.stop()
    : SoundPlayer.ship.play({ loop: true, volume: 0.1 });
};
