import MuteButton from "./MuteButton";
import TimeButton from "./TimeButton";
import Fade from "@mui/material/Fade";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/Fabs.module.css";
import { AnimatePresence, motion } from "framer-motion";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
export default function Fabs({ muteCallback, time, setTime, status, isSound }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fade in={true} timeout={1000}>
        <Fab
          size='medium'
          color='secondary'
          aria-label='mute'
          onClick={() => setIsOpen(e => !e)}
          className={styles.settings}
        >
          {isOpen ? <ArrowCircleRightOutlinedIcon /> : <SettingsIcon />}
        </Fab>
      </Fade>
      <AnimatePresence exitBeforeEnter={true}>
        {isOpen && (
          <motion.div
            className={styles.fabsContainer}
            initial={{ right: 64, opacity: 0 }}
            animate={{ right: 76, opacity: 1 }}
            exit={{ right: 50, opacity: 0 }}
            key='fabs'
          >
            <MuteButton
              callback={muteCallback}
              changePosition={status === 1}
              isSound={isSound}
            />
            <TimeButton time={time} setTime={setTime} hide={status === 1} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
