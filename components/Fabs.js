import MuteButton from "./MuteButton";
import TimeButton from "./TimeButton";
import Fade from "@mui/material/Fade";
import SettingsIcon from "@mui/icons-material/Settings";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import styles from "../styles/Fabs.module.css";
import { AnimatePresence, motion } from "framer-motion";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ProfileButton from "./ProfileButton";

export default function Fabs({ muteCallback, time, setTime, status, isSound }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Fade in={true} timeout={1000}>
        <div>
          <ProfileButton />
          <Fab
            size='medium'
            color='secondary'
            aria-label='settings'
            onClick={() => setIsOpen(e => !e)}
            className={styles.settings}
          >
            {isOpen ? <ArrowCircleRightOutlinedIcon /> : <SettingsIcon />}
          </Fab>
        </div>
      </Fade>
      <AnimatePresence exitBeforeEnter={true}>
        {isOpen && (
          <motion.div
            className={styles.fabsContainer}
            initial={{ right: 128, opacity: 0 }}
            animate={{ right: 140, opacity: 1 }}
            exit={{ right: 114, opacity: 0 }}
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
