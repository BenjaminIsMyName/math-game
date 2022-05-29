import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import styles from "../styles/TimeButton.module.css";
import { useState } from "react";

export default function TimeButton({ time, setTime, hide, size }) {
  const [open, setOpen] = useState(false);
  function handleClick(newTime) {
    setOpen(false);
    setTime(newTime);
  }

  let actions = [3, 5, 9];
  return (
    <SpeedDial
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      ariaLabel='time limit'
      className={`${styles.btn} ${hide ? styles.hide : ""}`}
      icon={<SpeedDialIcon icon={<TimerIcon />} openIcon={<CloseIcon />} />}
      FabProps={{
        color: "secondary",
        size: size,
      }}
    >
      {actions.map(n => {
        return (
          <SpeedDialAction
            key={n}
            icon={<span className={styles.text}>{n}s</span>}
            tooltipTitle={`${n} seconds`}
            onClick={() => handleClick(n)}
            className={time.current === n ? styles.selected : styles.action}
            FabProps={{
              size: "small",
            }}
          />
        );
      })}
    </SpeedDial>
  );
}
