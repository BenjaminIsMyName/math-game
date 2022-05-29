import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SpeedDial from "@mui/material/SpeedDial";
import { useState } from "react";
import styles from "../styles/ProfileButton.module.css";
export default function ProfileButton({ size }) {
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
        size: size,
      }}
    >
      <SpeedDialAction
        key='coming soon'
        icon={<PersonIcon />}
        tooltipTitle={`Coming Soon`}
        tooltipOpen={true}
        onClick={null}
        FabProps={{
          sx: {
            backgroundColor: "black",
          },
          size: size,
        }}
      />
    </SpeedDial>
  );
}
