import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/MuteButton.module.css";

export default function MuteButton({
  callback,
  changePosition,
  isSound,
  size,
}) {
  const [muted, setMuted] = useState(!isSound.current);

  return (
    <Tooltip
      title={muted ? "Unmute" : "Mute"}
      className={`${styles.btn} ${changePosition ? styles.rightPosition : ""}`}
    >
      <Fab
        size={size}
        onClick={() => {
          callback();
          setMuted(prev => !prev);
        }}
        color='secondary'
        aria-label='mute'
      >
        {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Fab>
    </Tooltip>
  );
}
