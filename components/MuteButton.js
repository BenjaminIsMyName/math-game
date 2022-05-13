import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/MuteButton.module.css";
import Fade from "@mui/material/Fade";

export default function MuteButton({ callback }) {
  const [muted, setMuted] = useState(false);
  return (
    <Fade in={true} timeout={1000}>
      <Tooltip title={muted ? "Unmute" : "Mute"}>
        <Fab
          onClick={() => {
            callback();
            setMuted(prev => !prev);
          }}
          color='secondary'
          aria-label='mute'
          className={styles.muteButton}
        >
          {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Fab>
      </Tooltip>
    </Fade>
  );
}
