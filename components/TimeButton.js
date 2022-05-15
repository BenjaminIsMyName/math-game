import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import Button from "@mui/material/Button";
import styles from "../styles/TimeButton.module.css";
import { useState } from "react";
export default function TimeButton({ time, setTime, hide }) {
  const [open, setOpen] = useState(false);

  function handleClick(newTime) {
    setOpen(false);
    setTime(newTime);
  }

  return (
    <SpeedDial
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      ariaLabel='change the time limit'
      //   sx={{ position: "absolute", bottom: 16, right: 16 }}
      className={`${hide ? styles.hide : styles.show} ${styles.btn}`}
      icon={<SpeedDialIcon icon={<TimerIcon />} openIcon={<CloseIcon />} />}
      FabProps={{
        sx: {
          bgcolor: "secondary.main",
          "&:hover": {
            bgcolor: "secondary.main",
          },
        },
      }}
    >
      <SpeedDialAction
        component='div'
        icon={
          <Button
            element='div'
            sx={{
              textTransform: "none",
              fontWeight: "bolder",
              fontSize: "1.1rem",
              color: time === 3 ? "success.main" : "text.primary",
            }}
          >
            3s
          </Button>
        }
        tooltipTitle={"3 seconds"}
        onClick={() => handleClick(3)}
      />
      <SpeedDialAction
        component='div'
        icon={
          <Button
            element='div'
            sx={{
              textTransform: "none",
              fontWeight: "bolder",
              fontSize: "1.1rem",
              color: time === 5 ? "success.main" : "text.primary",
            }}
          >
            5s
          </Button>
        }
        tooltipTitle={"5 seconds"}
        onClick={() => handleClick(5)}
      />
      <SpeedDialAction
        component='div'
        icon={
          <Button
            element='div'
            sx={{
              textTransform: "none",
              fontWeight: "bolder",
              fontSize: "1.1rem",
              color: time === 9 ? "success.main" : "text.primary",
            }}
          >
            9s
          </Button>
        }
        tooltipTitle={"9 seconds"}
        onClick={() => handleClick(9)}
      />
    </SpeedDial>
  );
}
