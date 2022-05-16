import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import styles from "../styles/TimeButton.module.css";
import { useState } from "react";
import { Typography } from "@mui/material";
export default function TimeButton({ time, setTime, hide }) {
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
      }}
    >
      {actions.map(n => {
        return (
          <SpeedDialAction
            key={n}
            component='div'
            icon={
              <Typography
                sx={{
                  textTransform: "none",
                  fontWeight: "bolder",
                  fontSize: "1.1rem",
                  color: "text.main",
                }}
              >
                {n}s
              </Typography>
            }
            tooltipTitle={`${n} seconds`}
            onClick={() => handleClick(n)}
            className={time === n ? styles.selected : styles.action}
          />
        );
      })}
    </SpeedDial>
  );
}
