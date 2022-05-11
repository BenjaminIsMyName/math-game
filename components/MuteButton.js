import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/MuteButton.module.css";
export default function MuteButton({ callback }) {
  const [muted, setMuted] = useState(false);
  return (
    <Fab
      onClick={() => {
        // isSound.current = !isSound.current;
        // setSound();
        callback();
        setMuted(prev => !prev);
      }}
      color='secondary'
      aria-label='mute'
      className={styles.muteButton}
    >
      {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </Fab>
  );
}
