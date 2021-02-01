import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ErrorDialog = ({open, handleCloseError, error}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCloseError}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"הפעולת לא בוצעה"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseError} color="primary">
          לסגור הודעה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ErrorDialog as default };
