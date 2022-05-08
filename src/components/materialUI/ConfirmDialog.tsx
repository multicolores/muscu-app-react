import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./ConfirmDialog.scss";

export default function ConfirmDialog(props: any) {
  const { confirmDialog, setConfirmDialog } = props;
  console.log(props);

  const handleClose = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  return (
    <Dialog open={confirmDialog.isOpen} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <div className="container">
        <DialogContent>
          <h3>{confirmDialog.title}</h3>
          <span>{confirmDialog.subTitle}</span>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="success"
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
            className="undoButton"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDialog.onConfirm}
            className=""
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
