import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function PlayAgainSnackbar({
  isSnackbarOpen,
  playAgain,
  handleCloseOfSnackbar,
}) {
  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseOfSnackbar}
      message='Game is over!'
      action={
        <>
          <Button color='info' size='small' onClick={playAgain}>
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
