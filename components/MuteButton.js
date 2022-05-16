import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/MuteButton.module.css";

export default function MuteButton({ callback, changePosition }) {
  const [muted, setMuted] = useState(false);
  return (
    <Tooltip
      title={muted ? "Unmute" : "Mute"}
      className={`${styles.btn} ${changePosition ? styles.rightPosition : ""}`}
    >
      <Fab
        onClick={() => {
          callback();
          setMuted(prev => !prev);
        }}
        color='secondary'
        aria-label='mute'
        // sx={{
        //   pointerEvents: "auto", // we disabled pointer events on the parent, so we need to re-enable them
        // }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Fab>
    </Tooltip>
  );
}
