import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SpeedDial from "@mui/material/SpeedDial";
import { useState } from "react";
import styles from "../styles/ProfileButton.module.css";
export default function ProfileButton() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <SpeedDial
      className={styles.profile}
      onClose={() => setIsProfileOpen(false)}
      onOpen={() => setIsProfileOpen(true)}
      open={isProfileOpen}
      ariaLabel='profile'
      icon={<SpeedDialIcon icon={<PersonIcon />} openIcon={<CloseIcon />} />}
      FabProps={{
        color: "secondary",
        size: "medium",
      }}
    >
      <SpeedDialAction
        key='theme'
        icon={"Test"}
        tooltipTitle={`Theme`}
        tooltipOpen={true}
        onClick={null}
      />
    </SpeedDial>
  );
}
