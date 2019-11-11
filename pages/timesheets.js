import React from 'react';
import {useSelector} from 'react-redux'
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {CircularProgress, Button} from '@material-ui/core';
import AddHoursModal from '../components/addHoursModal';
import Layout from '../components/layout';

export default function TimeSheets() {
  const [open, setOpen] = React.useState(false);

  useFirestoreConnect([
    {collection: 'timesheets'}
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const timesheets = useSelector(state => state.firestore.ordered.timesheets);

  return (
    <Layout>
      <h1>Time Sheets</h1>
      {!isLoaded(timesheets) ? <CircularProgress/> : (
        <>
          <ul>
            {!isEmpty(timesheets) && timesheets.map((sheet, idx) => <li key={idx}>{sheet.date}</li>)}
          </ul>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            + Add Hours
          </Button>
        </>
      )}
      <AddHoursModal open={open} handleClose={handleClose}/>
    </Layout>
  );
}
