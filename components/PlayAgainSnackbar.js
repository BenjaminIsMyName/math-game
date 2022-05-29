import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/PlayAgainSnackbar.module.css";
export default function PlayAgainSnackbar({
  isSnackbarOpen,
  playAgain,
  handleCloseOfSnackbar,
}) {
  return (
    <Snackbar
      // anchorOrigin={{
      //   vertical: "top",
      //   horizontal: "left",
      // }}
      // sx={{ bottom: { xs: 90, sm: 30 } }}
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseOfSnackbar}
      message='Game is over!'
      ContentProps={{
        className: styles.snackbar,
      }}
      action={
        <>
          <Button
            color='success'
            size='small'
            onClick={playAgain}
            className={styles.btn}
          >
            PLAY AGAIN
          </Button>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleCloseOfSnackbar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  );
}
