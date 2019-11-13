import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withFirestore} from 'react-redux-firebase';
import {CircularProgress} from '@material-ui/core';

function DeleteProjectsModal({open, handleClose, firestore, idsToDelete, setIdsToDelete}) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteTimeSheets() {
    setIsDeleting(true);
    await Promise.all(idsToDelete.map(id => firestore.delete({collection: 'projects', doc: id})));
    setIdsToDelete([]);
    setIsDeleting(false);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Projects</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected projects?
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button onClick={deleteTimeSheets} disabled={isDeleting}>
              {isDeleting ? <CircularProgress/> : 'Delete'}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withFirestore(DeleteProjectsModal);
