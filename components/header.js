import React from 'react';
import Router from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonLink from './buttonLink';
import {useFirebase, isEmpty} from 'react-redux-firebase';
import {useSelector} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
  loginControls: {
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
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenUserMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  function loginWithGoogle() {
    return firebase.login({provider: 'google', type: 'popup'});
  }

  function logoutGoogle() {
    return firebase.logout();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button className={classes.logoContainer} onClick={() => Router.push("/")}>
            <img src="/logo.svg" alt="logo" width={25}/>
            <Typography variant="h6" className={classes.title}>
              Contractor
            </Typography>
          </Button>
          {!isEmpty(auth) && (
            <>
              <ButtonLink color="inherit" href="/timesheets" text="Time Sheets"/>
              <ButtonLink color="inherit" href="/projects" text="Projects"/>
              <ButtonLink color="inherit" href="/invoices" text="Invoices"/>
            </>
          )}
          {isEmpty(auth)
            ? <Button onClick={loginWithGoogle} color="inherit" className={classes.loginControls}>Login</Button>
            : (
              <>
              <Button
                onClick={handleOpenUserMenu}
                color="inherit"
                className={classes.loginControls}
              >
                {auth.displayName}
                {auth.photoURL && (
                  <img
                    style={{borderRadius: '50%', marginLeft: 10, boxShadow: '0px 0px 7px 5px rgba(0,0,0,0.2)'}}
                    src={auth.photoURL}
                    alt="avatar"
                    width={30}
                  />
                )}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleCloseUserMenu() || logoutGoogle()}>Logout</MenuItem>
              </Menu>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
