import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const PopUpBox = ({ title, text, path, openPopUp, setOpenPopUp }) => {
  const history = useHistory();

  const handlePopUpClose = () => {
    setOpenPopUp(false);
    history.push(`${path}`);
  };

  return (
    <Dialog
      open={openPopUp}
      onClose={handlePopUpClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePopUpClose} color="primary">
          הבנתי
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpBox;
