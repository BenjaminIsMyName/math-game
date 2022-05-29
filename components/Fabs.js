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
import useMediaQuery from "@mui/material/useMediaQuery";
export default function Fabs({ muteCallback, time, setTime, status, isSound }) {
  const [isOpen, setIsOpen] = useState(false);

  const size = useMediaQuery("(min-width:600px)") ? "large" : "medium";

  return (
    <>
      <Fade in={true} timeout={1000}>
        <div>
          <ProfileButton size={size} />
          <Fab
            size={size}
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
            animate={{ right: size === "medium" ? 140 : 156, opacity: 1 }}
            exit={{ right: 114, opacity: 0 }}
            key='fabs'
          >
            <MuteButton
              callback={muteCallback}
              changePosition={status === 1}
              isSound={isSound}
              size={size}
            />
            <TimeButton
              time={time}
              setTime={setTime}
              hide={status === 1}
              size={size}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
