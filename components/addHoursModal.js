import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {useFirestoreConnect, withFirestore} from 'react-redux-firebase';
import {Formik, Form, Field} from 'formik';
import {TextField, Select} from 'formik-material-ui';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

function AddHoursModal({open, handleClose, firestore}) {
  async function addHours(hours, setSubmitting) {
    await firestore.add('timesheets', hours);
    setSubmitting(false);
    handleClose();
  }

  useFirestoreConnect([
    {collection: 'projects'}
  ]);

  const projects = useSelector(state => state.firestore.ordered.projects);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Hours</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make sure to choose a project to add your hours to.
          </DialogContentText>
          <Formik
            initialValues={{date: '', startTime: '', endTime: '', project: ''}}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(true);
              return addHours(values, setSubmitting);
            }}
            validationSchema={Yup.object().shape({
              date: Yup.date().required('Required'),
              startTime: Yup.string().required('Required'),
              endTime: Yup.string().required('Required'),
              project: Yup.string().required('Required')
            })}
          >
            {({isSubmitting}) => (
              <Form>
                <InputLabel shrink={true} htmlFor="date">Date</InputLabel>
                <Field type="date" name="date" component={TextField} margin="dense" fullWidth autoFocus/>
                <InputLabel shrink={true} htmlFor="startTime">Start Time</InputLabel>
                <Field type="time" name="startTime" component={TextField} margin="dense" fullWidth/>
                <InputLabel shrink={true} htmlFor="endTime">End Time</InputLabel>
                <Field type="time" name="endTime" component={TextField} margin="dense" fullWidth/>
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

export default withFirestore(AddHoursModal);
