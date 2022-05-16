import MuteButton from "./MuteButton";
import TimeButton from "./TimeButton";
import Fade from "@mui/material/Fade";
// import styles from "../styles/Fabs.module.css";
export default function Fabs({ muteCallback, time, setTime, status }) {
  return (
    <Fade in={true} timeout={1000}>
      <div>
        <MuteButton callback={muteCallback} changePosition={status === 1} />
        <TimeButton time={time} setTime={setTime} hide={status === 1} />
      </div>
    </Fade>
  );
}
