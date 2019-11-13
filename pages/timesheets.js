import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {CircularProgress, Button, makeStyles, Checkbox} from '@material-ui/core';
import {differenceInMinutes, format} from 'date-fns';
import AddTimeSheetModal from '../components/addTimeSheetModal';
import Layout from '../components/layout';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import DeleteTimeSheetModal from '../components/deleteTimeSheetModal';
import {fieldSort} from '../utils/fieldSort';

function buildTimeSheetsTable(timeSheets, classes, idsToDelete, setIdsToDelete) {
  if (isEmpty(timeSheets)) return (
    <p style={{textAlign: 'center', marginTop: 40}}>There are no time sheets to display, try adding one above.</p>
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="timeSheets table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.checkBoxColumn}>
              <Checkbox
                indeterminate={idsToDelete.length > 0 && idsToDelete.length < timeSheets.length}
                checked={idsToDelete.length === timeSheets.length}
                onChange={() => idsToDelete.length === timeSheets.length
                  ? setIdsToDelete([])
                  : setIdsToDelete(timeSheets.map(timeSheet => timeSheet.id))
                }
              />
            </TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSheets.sort(fieldSort('project')).map((sheet, idx) => (
              <TableRow key={idx}>
                <TableCell className={classes.checkBoxColumn}>
                  <Checkbox
                    checked={idsToDelete.includes(sheet.id)}
                    onChange={() => idsToDelete.includes(sheet.id)
                      ? setIdsToDelete([...idsToDelete].filter(id => id !== sheet.id))
                      : setIdsToDelete([...idsToDelete, sheet.id])
                    }
                  />
                </TableCell>
                <TableCell>{sheet.project}</TableCell>
                <TableCell>{sheet.description}</TableCell>
                <TableCell>{format(new Date(sheet.startTime), 'Pp')}</TableCell>
                <TableCell>{format(new Date(sheet.endTime), 'Pp')}</TableCell>
                <TableCell>{differenceInMinutes(new Date(sheet.endTime), new Date(sheet.startTime)) / 60}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function TimeSheets() {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
      marginBottom: 20
    },
    table: {
      minWidth: 500,
      backgroundColor: '#f2f2f2'
    },
    headerContainer: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center'
    },
    deleteButton: {
      height: 40,
      color: 'red',
      marginRight: 10,
      borderColor: 'red',
      '&:hover': {
        background: 'lightred'
      }
    },
    checkBoxColumn: {
      width: 50
    }
  });
  const classes = useStyles();
  const [addTimeSheetOpen, setAddTimeSheetOpen] = useState(false);
  const [deleteTimeSheetOpen, setDeleteTimeSheetOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);

  useFirestoreConnect([
    {collection: 'timesheets'}
  ]);

  const handleClickOpenAddTimeSheet = () => {
    setAddTimeSheetOpen(true);
  };

  const handleCloseAddTimeSheet = () => {
    setAddTimeSheetOpen(false);
  };

  const handleClickOpenDeleteTimeSheet = () => {
    setDeleteTimeSheetOpen(true);
  };

  const handleCloseDeleteTimeSheet = () => {
    setDeleteTimeSheetOpen(false);
  };

  const timeSheets = useSelector(state => state.firestore.ordered.timesheets);

  return (
    <Layout>
      <div className={classes.headerContainer}>
        <h1 style={{flexGrow: 1}}>Time Sheets</h1>
        {idsToDelete.length > 0 && (
          <Button className={classes.deleteButton} variant="outlined" onClick={handleClickOpenDeleteTimeSheet}>
            Delete Selected
          </Button>
        )}
        <Button style={{height: 40}} variant="outlined" onClick={handleClickOpenAddTimeSheet}>
          + Add Time Sheet
        </Button>
      </div>
      {!isLoaded(timeSheets)
        ? <CircularProgress/>
        : buildTimeSheetsTable(
          timeSheets,
          classes,
          idsToDelete,
          setIdsToDelete
        )
      }
      <AddTimeSheetModal open={addTimeSheetOpen} handleClose={handleCloseAddTimeSheet}/>
      <DeleteTimeSheetModal
        open={deleteTimeSheetOpen}
        handleClose={handleCloseDeleteTimeSheet}
        idsToDelete={idsToDelete}
        setIdsToDelete={setIdsToDelete}
      />
    </Layout>
  );
}
