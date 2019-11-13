import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddProjectModal from '../components/addProjectModal';
import DeleteProjectsModal from '../components/deleteProjectsModal';
import Layout from '../components/layout';
import {Checkbox} from '@material-ui/core';
import {fieldSort} from '../utils/fieldSort';

function buildProjectsTable(projects, classes, idsToDelete, setIdsToDelete) {
  if (isEmpty(projects)) return (
    <p style={{textAlign: 'center', marginTop: 40}}>There are no projects to display, try adding one above.</p>
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="projects table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.checkBoxColumn}>
              <Checkbox
                indeterminate={idsToDelete.length > 0 && idsToDelete.length < projects.length}
                checked={idsToDelete.length === projects.length}
                onChange={() => idsToDelete.length === projects.length
                  ? setIdsToDelete([])
                  : setIdsToDelete(projects.map(project => project.id))
                }
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.sort(fieldSort('name')).map(project => (
            <TableRow key={project.name}>
              <TableCell className={classes.checkBoxColumn}>
                <Checkbox
                  checked={idsToDelete.includes(project.id)}
                  onChange={() => idsToDelete.includes(project.id)
                    ? setIdsToDelete([...idsToDelete].filter(id => id !== project.id))
                    : setIdsToDelete([...idsToDelete, project.id])
                  }
                />
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.email}</TableCell>
              <TableCell>{project.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function Projects() {
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
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);

  useFirestoreConnect([
    {collection: 'projects'}
  ]);

  const handleClickOpenAddProject = () => {
    setAddProjectOpen(true);
  };

  const handleCloseAddProject = () => {
    setAddProjectOpen(false);
  };

  const handleClickOpenDeleteProject = () => {
    setDeleteProjectOpen(true);
  };

  const handleCloseDeleteProject = () => {
    setDeleteProjectOpen(false);
  };

  const projects = useSelector(state => state.firestore.ordered.projects);

  return (
    <Layout>
      <div className={classes.headerContainer}>
        <h1 style={{flexGrow: 1}}>Projects</h1>
        {idsToDelete.length > 0 && (
          <Button className={classes.deleteButton} variant="outlined" onClick={handleClickOpenDeleteProject}>
            Delete Selected
          </Button>
        )}
        <Button style={{height: 40}} variant="outlined" onClick={handleClickOpenAddProject}>
          + Add Project
        </Button>
      </div>
      {!isLoaded(projects)
        ? <CircularProgress/>
        : buildProjectsTable(
          projects,
          classes,
          idsToDelete,
          setIdsToDelete
        )
      }
      <AddProjectModal open={addProjectOpen} handleClose={handleCloseAddProject}/>
      <DeleteProjectsModal
        open={deleteProjectOpen}
        handleClose={handleCloseDeleteProject}
        idsToDelete={idsToDelete}
        setIdsToDelete={setIdsToDelete}
      />
    </Layout>
  );
}
