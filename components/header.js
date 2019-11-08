import React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonLink from './buttonLink';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    marginLeft: 'auto'
  },
  logoContainer: {
    display: 'flex',
    cursor: 'pointer',
    textTransform: 'capitalize'
  },
  linkButton: {
    color: 'white'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.logoContainer} onClick={() => Router.push("/")}>
            <img src="/logo.svg" alt="logo" width={25} />
            <Typography variant="h6" className={classes.title}>
              Contractor
            </Typography>
          </Button>
          <ButtonLink color="inherit" href="/projects" text="Projects" />
          <ButtonLink color="inherit" href="/invoices" text="Invoices" />
          <Button color="inherit" className={classes.loginButton}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
