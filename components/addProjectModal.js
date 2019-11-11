import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withFirestore} from 'react-redux-firebase';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import * as Yup from 'yup';

function AddProjectModal({open, handleClose, firestore}) {
  async function addProject(project, setSubmitting) {
    await firestore.add('projects', project);
    setSubmitting(false);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new Project. This will be used when assigning hours in order to generate invoices.
          </DialogContentText>
          <Formik
            initialValues={{name: '', email: '', address: ''}}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              return addProject(values, setSubmitting);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Required'),
              email: Yup.string().email().required('Required'),
              address: Yup.string()
            })}
          >
            {({isSubmitting}) => (
              <Form>
                <Field type="text" name="name" component={TextField} margin="dense" fullWidth label="Name" autoFocus/>
                <Field type="email" name="email" component={TextField} margin="dense" fullWidth label="Email"/>
                <Field type="text" name="address" component={TextField} margin="dense" fullWidth label="Address"/>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>

      </Dialog>
    </div>
  );
}

export default withFirestore(AddProjectModal);
