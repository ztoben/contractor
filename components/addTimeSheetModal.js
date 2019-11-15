import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {firestoreConnect} from 'react-redux-firebase';
import {Formik, Form, Field} from 'formik';
import {TextField, Select} from 'formik-material-ui';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {compose} from 'redux';

function AddTimeSheetModal({open, handleClose, firestore, auth, projects}) {
  async function addTimeSheet(timeSheet, setSubmitting) {
    await firestore.add('timesheets', {...timeSheet, uid: auth.uid});
    setSubmitting(false);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Time Sheet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make sure to choose a project to add your time sheet to.
          </DialogContentText>
          <Formik
            initialValues={{description: '', startTime: '', endTime: '', project: ''}}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              return addTimeSheet(values, setSubmitting);
            }}
            validationSchema={Yup.object().shape({
              startTime: Yup.date().required('Required'),
              endTime: Yup.date().required('Required'),
              project: Yup.string().required('Required'),
              description: Yup.string()
            })}
          >
            {({isSubmitting}) => (
              <Form>
                <InputLabel shrink={true} htmlFor="startTime">Start Time</InputLabel>
                <Field type="datetime-local" name="startTime" component={TextField} margin="dense" fullWidth/>
                <InputLabel shrink={true} htmlFor="endTime">End Time</InputLabel>
                <Field type="datetime-local" name="endTime" component={TextField} margin="dense" fullWidth/>
                <InputLabel shrink={true} htmlFor="project">
                  Project
                </InputLabel>
                <Field
                  type="text"
                  name="project"
                  label="Project"
                  select
                  variant="standard"
                  margin="dense"
                  component={Select}
                  fullWidth
                >
                  {projects && projects.map(project => (
                    <MenuItem key={project.name} value={project.name}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Field>
                <InputLabel shrink={true} htmlFor="description">Description</InputLabel>
                <Field type="text" name="description" component={TextField} margin="dense" fullWidth/>
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    projects: state.firestore.ordered.projects,
    firestore: state.firestore
  }
};

export default compose(connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];

    return [
      {
        collection: 'projects',
        where: [
          ['uid', '==', props.auth.uid]
        ]
      }
    ]
  })
)(AddTimeSheetModal);
